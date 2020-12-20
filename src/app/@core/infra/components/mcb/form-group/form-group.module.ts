import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from './form-group.component';
import { PanelBarModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [
    FormGroupComponent
  ],
  imports: [
    CommonModule,
    PanelBarModule
  ],
  exports: [
    FormGroupComponent
  ]
})
export class FormGroupModule { }
