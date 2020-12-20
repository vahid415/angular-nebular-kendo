import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';

import { MoneyInputComponent } from './money-input.component';

@NgModule({
  declarations: [
    MoneyInputComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    NumericTextBoxModule
  ],
  exports: [
    MoneyInputComponent
  ]
})
export class MoneyInputModule { }
