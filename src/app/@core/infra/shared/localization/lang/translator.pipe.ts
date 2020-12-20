import { Pipe, PipeTransform } from '@angular/core';
import { TranslatorService } from './translator.service';

@Pipe({
  name: 'translator'
})
export class TranslatorPipe implements PipeTransform {
  constructor(private translator: TranslatorService) {
  }

  transform(value: any, subsystem?: any): any {
    return this.translator.translate(value, subsystem);
  }
}
