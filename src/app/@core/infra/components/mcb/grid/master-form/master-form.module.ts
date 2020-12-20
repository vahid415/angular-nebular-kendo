import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { PanelBarModule, LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonModule, DropDownButtonModule } from '@progress/kendo-angular-buttons';

import { McbGridModule } from './../mcb-grid.module';
import { MasterFormComponent } from './master-form.component';
import { MainPanelModule } from '../../main-panel/main-panel.module';
import { UtilsModule } from './../../../../shared/utils/utils.module';
import { ToggleBtnModule } from './../../toggle-btn/toggle-btn.module';
import { SecurityModule } from './../../../../../portal/security/security.module';
import { LocalizationModule } from '../../../../shared/localization/localization.module';

const kendoModules = [
  GridModule,
  CommonModule,
  ButtonModule,
  InputsModule,
  LayoutModule,
  TooltipModule,
  PanelBarModule,
  DropDownButtonModule,
];

const mcbModules = [
  UtilsModule,
  McbGridModule,
  SecurityModule,
  ToggleBtnModule,
  MainPanelModule,
  LocalizationModule,
];

@NgModule({
  imports: [...kendoModules, ...mcbModules],
  declarations: [MasterFormComponent],
  exports: [MasterFormComponent]
})
export class MasterFormModule { }
