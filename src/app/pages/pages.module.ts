import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbCardModule
  ],
  declarations: [
    PagesComponent,
    NotFoundComponent
  ],
})
export class PagesModule {
}
