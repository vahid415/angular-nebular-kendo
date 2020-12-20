import { NgModule } from '@angular/core';
import { RTL } from '@progress/kendo-angular-l10n';

import { PortalModalComponent } from './modal/modal.component';
import { PortalToastComponent } from './toast/toast.component';
import { PortalLoaderComponent } from './loader/loader.component';
import { PortalLayoutComponent } from './portal-layout.component';
import { PortalTooltipComponent } from './tooltip/tooltip.component';
import { PortalConfirmationDialogComponent } from './confimation-dialog/confirmation-dialog.component';
import { PortalUserChangePasswordComponent } from './user-change-password/user-change-password.component';

import { KendoComponentsModule } from '../../../../../infra/components/kendo/kendo.module';
import { AppComponentsModule } from '../../../../../infra/components/mcb/app-components.module';
import { CommonCoreModule } from '../../../../../infra/shared/common-core.module';

@NgModule({
  declarations: [
    PortalToastComponent,
    PortalModalComponent,
    PortalLayoutComponent,
    PortalLoaderComponent,
    PortalTooltipComponent,
    PortalConfirmationDialogComponent,
    PortalUserChangePasswordComponent
  ],
  imports: [
    CommonCoreModule,
    KendoComponentsModule,
    AppComponentsModule
  ],
  providers: [
    { provide: RTL, useValue: true },
  ],
  exports: [
  ]
})
export class PortalLayoutModule {
}
