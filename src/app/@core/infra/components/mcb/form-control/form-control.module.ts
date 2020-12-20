import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './form-control.component';
import { RequiredFieldDirective } from './required.directive';

@NgModule({
  declarations: [
    FormControlComponent,
    RequiredFieldDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormControlComponent,
    RequiredFieldDirective
  ]
})
export class FormControlModule { }
