import {Injectable} from '@angular/core';
import {TranslatorService} from '../localization/lang/translator.service';

@Injectable()
export class CommonService {
  constructor(private translator: TranslatorService) {
  }

  public getEnumkeys(enumType: object) {
    return Object.keys(enumType)
      .filter((x) => Number.isNaN(parseInt(x, 10)));
  }

  public enumToKeyValueArray(enumType: object) {
    return this.getEnumkeys(enumType)
      .map(key => ({
        key,
        value: enumType[key]
      }));
  }

  public enumToKeyValueArrayByTranslate(enumType: object, subSystem?: string) {
    return this.getEnumkeys(enumType)
      .map(key => ({
        key,
        value: this.translator.translate(key) ?? enumType[key],
        enumValue: enumType[key]
      }));
  }
}
