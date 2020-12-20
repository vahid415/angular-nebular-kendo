import { Inject, Injectable, Optional } from '@angular/core';

import { Locale, Dictionary } from '../types';
import enDict from './dictionaries/dictionary.en-us';
import { LanguageService } from './language.service';
import faIRDict from './dictionaries/dictionary.fa-ir';
import { Subsystem } from '../../../../portal/subsystem/types';
import { DictionaryService } from './dictionaries/dictionary.service';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private readonly infraDicts = [faIRDict, enDict];
  private infraDict: Dictionary;
  private sharedDict: Dictionary;
  private injectedSubsystemDict: Dictionary;
  private locale: Locale;

  constructor(
    private languageService: LanguageService,
    @Inject(Subsystem) @Optional() private subsystem: Subsystem,
    private dictService: DictionaryService
  ) {
    this.locale = languageService.locale;
    this.infraDict = this.infraDicts.find(d => d.locale === this.locale);
    if (subsystem instanceof Subsystem && Array.isArray(subsystem.dictionaries)) {
      this.injectedSubsystemDict = subsystem.dictionaries.find(d => d.locale === this.locale);
      if (subsystem.id === 'MCB_SHARED') {
        this.sharedDict = subsystem.dictionaries.find(d => d.locale === this.locale);
        this.dictService.sharedDict.next(this.sharedDict);
      }
      if (!this.injectedSubsystemDict) {
        throw Error(`No dictionary was found for subsystem "${subsystem.titleKey}" and locale "${this.locale}"`);
      }
    }
    this.dictService.sharedDict.subscribe((res) => this.sharedDict = res);
  }

  public translate(key: string, subsystem?: any): string {
    const sharedEntry = this.sharedDict ? this.sharedDict.entries[key] : undefined;
    if (subsystem instanceof Subsystem) {
      const dict = subsystem.dictionaries.find(d => d.locale === this.locale);
      if (dict) {
        const entry = dict.entries[key];
        return entry || this.infraDict.entries[key] || sharedEntry || key;
      }
    } else if (this.injectedSubsystemDict) {
      const entry = this.injectedSubsystemDict.entries[key];
      return entry || this.infraDict.entries[key] || sharedEntry || key;
    } else {
      return this.infraDict.entries[key] || sharedEntry || key;
    }
  }

  public instant(key: string, subsystem?: string) {
    return this.translate(key, subsystem);
  }

  translateWithParam(key: string, params: string[], subSystem?: string): string {
    let value = this.translate(key, subSystem);

    if (params) {
      for (let i = 0; i < params.length; i++) {
        const regex = new RegExp('\\{' + i + '\\}');
        value = value.replace(regex, this.translate(params[i]));
      }
    }
    return value;
  }

  translateWithParamsOnly(key: string, params: string[], subSystem?: string): string {
    let value = this.translate(key);

    if (params) {
      for (let i = 0; i < params.length; i++) {
        const regex = new RegExp('\\{' + i + '\\}');
        value = value.replace(regex, params[i]);
      }
    }
    return value;
  }
}
