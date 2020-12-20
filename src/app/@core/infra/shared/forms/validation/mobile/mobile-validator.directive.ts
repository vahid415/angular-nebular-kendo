import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MobileValidatorFn } from './mobile-validator';

@Directive({
  selector: '[mcbMobileValidator]',
  exportAs: 'mcbMobileValidator',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MobileValidatorDirective,
    multi: true
  }]
})
export class MobileValidatorDirective implements Validator {

  constructor() {
  }

  validate(control: FormControl): ValidationErrors | null {
    return MobileValidatorFn()(control);
  }

}
