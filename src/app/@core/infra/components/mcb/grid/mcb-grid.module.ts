import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule } from '@progress/kendo-angular-grid';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { McbGridComponent } from './mcb-grid.component';
import { FormGroupModule } from '../form-group/form-group.module';
import { MCBGridSearchDirective } from './mcb-grid-search.directive';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { McbGridCellComponent } from './mcb-grid-cell/mcb-grid-cell.component';
import { McbGridSearchComponent } from './mcb-grid-search/mcb-grid-search.component';
import { McbGridSearchInComponent } from './mcb-grid-search/mcb-grid-search-in.component';
import { CommonCoreModule } from '../../../../infra/shared/common-core.module';
import { McbGridJalaliDateFilterCellComponent } from './jalali-date-filter-cell/jalali-date-filter-cell.component';

const COMPONENTS = [
  McbGridComponent,
  McbGridCellComponent,
  McbGridSearchComponent,
  McbGridSearchInComponent,
  MCBGridSearchDirective,
  McbGridJalaliDateFilterCellComponent];
@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    NgbModule,
    CommonModule,
    CommonCoreModule,
    FormGroupModule,
    GridModule,
    TooltipModule,
    ToolBarModule,
    DropDownsModule,
    DatePickerModule,
    ButtonsModule
  ],
  exports: [
    COMPONENTS
  ]
})
export class McbGridModule {
}
