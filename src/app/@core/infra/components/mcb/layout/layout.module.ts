import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './column.component';
import { RowComponent } from './row.component';

@NgModule({
  declarations: [
    RowComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RowComponent,
    ColumnComponent
  ]
})
export class LayoutModule { }
