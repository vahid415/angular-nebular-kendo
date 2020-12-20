import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './time-picker.component';
import { TimePickerModule as KendoTimePickerModule } from '@progress/kendo-angular-dateinputs';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    KendoTimePickerModule
  ],
  exports: [
    TimePickerComponent
  ]
})
export class TimePickerModule { }
