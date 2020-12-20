import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McbWindowComponent } from './mcb-window.component';
import { WindowModule } from '@progress/kendo-angular-dialog';

@NgModule({
  declarations: [
    McbWindowComponent
  ],
  imports: [
    CommonModule,
    WindowModule
  ],
  exports: [
    McbWindowComponent
  ]
})
export class McbWindowModule { }
