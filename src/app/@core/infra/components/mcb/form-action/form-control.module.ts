import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormActionComponent } from './form-action.component';
import { ButtonModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [
    FormActionComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    FormActionComponent
  ]
})
export class FormActionModule { }
