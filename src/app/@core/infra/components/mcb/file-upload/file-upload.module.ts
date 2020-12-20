import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { FileUploadComponent } from './file-upload.component';
import { TextBoxModule } from '@progress/kendo-angular-inputs';

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TextBoxModule
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
