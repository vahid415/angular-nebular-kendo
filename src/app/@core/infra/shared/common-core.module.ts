import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UtilsModule } from './utils/utils.module';
import { McbFormsModule } from './forms/forms.module';
import { CommonService } from './services/common.service';
import { LocalizationModule } from './localization/localization.module';


@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,

    UtilsModule,
    McbFormsModule,
    LocalizationModule,
  ], providers: [CommonService]
})
export class CommonCoreModule {
}
