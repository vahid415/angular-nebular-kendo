import { NgModule } from '@angular/core';

import { OnlyCodeDirective } from './integer/only-code.directive';
import { OnlyNumberDirective } from './integer/only-number.directive';
import { PhoneValidatorDirective } from './phone/phone-validator.directive';
import { EqualWithDirective } from './equal-with/equalWith.directive';
import { MobileValidatorDirective } from './mobile/mobile-validator.directive';
import { WebsiteValidatorDirective } from './website/website-validator.directive';
import { NationalCodeValidatorDirective } from './national-code/national-code-validator.directive';

@NgModule({
  declarations: [
    MobileValidatorDirective,
    NationalCodeValidatorDirective,
    PhoneValidatorDirective,
    WebsiteValidatorDirective,
    EqualWithDirective,
    OnlyNumberDirective,
    OnlyCodeDirective,
  ],
  exports: [
    MobileValidatorDirective,
    NationalCodeValidatorDirective,
    PhoneValidatorDirective,
    WebsiteValidatorDirective,
    EqualWithDirective,
    OnlyNumberDirective,
    OnlyCodeDirective,
  ]
})
export class ValidationModule { }
