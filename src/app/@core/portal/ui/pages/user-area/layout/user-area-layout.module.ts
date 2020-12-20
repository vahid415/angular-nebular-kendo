import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import {
  NbThemeModule, NbLayoutModule, NbMenuModule,
  NbSidebarModule, NbContextMenuModule,
  DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME,
  DEFAULT_MEDIA_BREAKPOINTS,
  NbActionsModule,
  NbUserModule,
  NbIconModule
} from '@nebular/theme';

import { PortalUserAreaLayoutComponent } from './user-area-layout.component';
import { PortalUserAreaFooterComponent } from './partials/footer/footer.component';
import { PortalUserAreaHeaderComponent } from './partials/header/header.component';
import { PortalUserAreaSidebarComponent } from './partials/sidebar/sidebar.component';
import { PortalUserAreaUserStatusComponent } from './partials/user-status/user-status.component';
import { PortalUserAreaBreadcrumbComponent } from './partials/bread-crumb/breadcrumb.component';

import { McbRouterModule } from '../../../../routing/router.module';
import { KendoComponentsModule } from '../../../../../infra/components/kendo/kendo.module';
import { AppComponentsModule } from '../../../../../infra/components/mcb/app-components.module';
import { CommonCoreModule } from '../../../../../infra/shared/common-core.module';
const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbContextMenuModule,
  NgbModule,
  NbActionsModule,
  NbUserModule,
  NbIconModule,
  NbEvaIconsModule
];
const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default'
    },
    [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME], DEFAULT_MEDIA_BREAKPOINTS
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];
@NgModule({
  declarations: [
    PortalUserAreaLayoutComponent,
    PortalUserAreaHeaderComponent,
    PortalUserAreaFooterComponent,
    PortalUserAreaSidebarComponent,
    PortalUserAreaUserStatusComponent,
    PortalUserAreaBreadcrumbComponent,
  ],
  imports: [
    ...NB_MODULES,
    McbRouterModule,
    PanelBarModule,
    CommonCoreModule,
    KendoComponentsModule,
    AppComponentsModule,
    NbThemeModule.forRoot({ name: 'default' }),

  ],
  providers: [...NB_THEME_PROVIDERS]
})
export class PortalUserAreaLayoutModule { }
