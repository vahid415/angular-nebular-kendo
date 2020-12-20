import {Directive} from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {WebsiteValidatorFn} from './website-validator';

@Directive({
  selector: '[mcbWebsiteValidator]',
  exportAs: 'mcbWebsiteValidator',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: WebsiteValidatorDirective,
    multi: true
  }]
})
export class WebsiteValidatorDirective implements Validator {
  constructor() {
  }

  validate(control: FormControl): ValidationErrors | null {
    return WebsiteValidatorFn()(control);
  }
}
