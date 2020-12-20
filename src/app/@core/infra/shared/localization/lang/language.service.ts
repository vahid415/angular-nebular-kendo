import { Injectable } from '@angular/core';
import { Locale } from '../types';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  get locale(): Locale {
    return 'faIR';
  }
}
