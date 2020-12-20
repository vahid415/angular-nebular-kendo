import { NgModule } from '@angular/core';

import { InputModule } from './input/input.module';
import { LayoutModule } from './layout/layout.module';
import { LookupModule } from './lookup/lookup.module';
import { McbGridModule } from './grid/mcb-grid.module';
import { McbWindowModule } from './window/window.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { TreeViewModule } from './tree-view/tree-view.module';
import { MainPanelModule } from './main-panel/main-panel.module';
import { FormGroupModule } from './form-group/form-group.module';
import { ToggleBtnModule } from './toggle-btn/toggle-btn.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FormActionModule } from './form-action/form-control.module';
import { MoneyInputModule } from './money-input/money-input.module';
import { FormControlModule } from './form-control/form-control.module';
import { MasterFormModule } from './grid/master-form/master-form.module';
import { EnglishInputModule } from './english-input/english-input.module';
import { PersianInputModule } from './persian-input/persian-input.module';

@NgModule({
  exports: [
    InputModule,
    LayoutModule,
    LookupModule,
    McbGridModule,
    TreeViewModule,
    CheckboxModule,
    McbWindowModule,
    MainPanelModule,
    ToggleBtnModule,
    FormGroupModule,
    MasterFormModule,
    DatePickerModule,
    FileUploadModule,
    FormActionModule,
    MoneyInputModule,
    FormControlModule,
    EnglishInputModule,
    PersianInputModule,
  ]
})
export class AppComponentsModule {
}
