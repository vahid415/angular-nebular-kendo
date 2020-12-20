import { NgModule } from '@angular/core';

import { RTL } from '@progress/kendo-angular-l10n';
import { IntlModule } from '@progress/kendo-angular-intl';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { PanelBarModule, LayoutModule } from '@progress/kendo-angular-layout';
import { InputsModule, CheckBoxModule } from '@progress/kendo-angular-inputs';
import { GridModule, BodyModule, SharedModule } from '@progress/kendo-angular-grid';
import { ButtonModule, DropDownButtonModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule, TimePickerModule } from '@progress/kendo-angular-dateinputs';
import { ContextMenuModule, MenuModule, MenusModule } from '@progress/kendo-angular-menu';


@NgModule({
  providers: [
    { provide: RTL, useValue: true }
  ],
  exports: [
    MenuModule,
    IntlModule,
    GridModule,
    BodyModule,
    PopupModule,
    MenusModule,
    SharedModule,
    WindowModule,
    LayoutModule,
    DialogModule,
    InputsModule,
    ButtonModule,
    TooltipModule,
    ToolBarModule,
    TreeViewModule,
    PanelBarModule,
    CheckBoxModule,
    DropDownsModule,
    DateInputsModule,
    TimePickerModule,
    ContextMenuModule,
    NotificationModule,
    DropDownButtonModule,
  ]
})
export class KendoComponentsModule {
}
