import {Directive} from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import { NationalCodeValidatorFn } from './national-code-validator';


@Directive({
  selector: '[mcbNationalCodeValidator], [mcbNationalCode]', exportAs: 'mcbNationalCodeValidator',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NationalCodeValidatorDirective,
      multi: true
    }
  ]
})
export class NationalCodeValidatorDirective implements Validator {

  constructor() {
  }

  validate(control: FormControl): ValidationErrors | null {
    return NationalCodeValidatorFn()(control);
  }

}
