import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { equalWithValidator } from './equalWith-validator';

@Directive({
      // tslint:disable-next-line: directive-selector
      selector: '[equalWith]',
      providers: [
            { provide: NG_VALIDATORS, useExisting: EqualWithDirective, multi: true }
      ]
})
export class EqualWithDirective implements Validator {
      @Input('equalWith') targetValue: string;
      @Input() inequalityMessage: string;

      constructor() {
      }

      validate(control: AbstractControl): { [key: string]: any } | null {
            return equalWithValidator(this.targetValue, this.inequalityMessage)(control);
      }
}
