import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyInputDirective } from './money-input.directive';
import { EnglishInputDirective } from './english-input.directive';
import { PersianInputDirective } from './persian-input.directive';

const DECLARES = [
    PersianInputDirective,
    EnglishInputDirective,
    MoneyInputDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: DECLARES,
  exports: DECLARES
})
export class MaskModule {
}
