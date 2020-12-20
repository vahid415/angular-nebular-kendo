import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupComponent } from './lookup.component';
import { LookupDirective } from './lookup.directive';
import { LayoutModule } from '../layout/layout.module';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { FormsModule } from '@angular/forms';
import { CommonCoreModule } from '../../../shared/common-core.module';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TextBoxModule, InputsModule } from '@progress/kendo-angular-inputs';


@NgModule({
  declarations: [
    LookupComponent,
    LookupDirective,
  ],
  imports: [
    CommonModule,
    ToolBarModule,
    WindowModule,
    LayoutModule,
    FormsModule,
    TooltipModule,
    CommonCoreModule,
    ButtonsModule,
    TextBoxModule,
    // InputsModule
  ],
  exports: [
    LookupComponent,
    LookupDirective
  ]
})
export class LookupModule { }
