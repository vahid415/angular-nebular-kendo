import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { CommonCoreModule } from '../../../shared/common-core.module';
import { PersianInputComponent } from './persian-input.component';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PersianInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TextBoxModule,
    TooltipModule,
    CommonCoreModule
  ],
  exports: [
    PersianInputComponent
  ]
})
export class PersianInputModule { }
