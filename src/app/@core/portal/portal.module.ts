import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PortalHttpModule } from './http/http.module';
import { McbRouterModule } from './routing/router.module';
import { SecurityModule } from './security/security.module';
import { PortalLayoutModule } from './ui/pages/common/layout/portal-layout.module';

@NgModule({
  imports: [
    HttpClientModule,
    PortalHttpModule,
    McbRouterModule,
    PortalLayoutModule,
    SecurityModule
  ],
  exports: [
    McbRouterModule,
    SecurityModule
  ]
})
export class PortalModule {
}
