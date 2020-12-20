import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelComponent } from './main-panel.component';
import { LocalizationModule } from '../../../shared/localization/localization.module';

@NgModule({
  declarations: [
    MainPanelComponent
  ],
  imports: [
    CommonModule,
    LocalizationModule
  ],
  exports: [
    MainPanelComponent
  ]
})
export class MainPanelModule { }
