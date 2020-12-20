import { environment } from './../../environments/environment';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  SeoService,
  StateService,
} from './infra/shared/services';
import { UserService } from './infra/shared/mock/users.service';
import { UserData } from './infra/shared/data/users';
import { MockDataModule } from './infra/shared/mock/mock-data.module';
import { AppComponentsModule } from './infra/components/mcb/app-components.module';
import { KendoComponentsModule } from './infra/components/kendo/kendo.module';
import { CommonCoreModule } from './infra/shared/common-core.module';
import { FakeAuthenticationProviderModule } from './portal/security/authentication/providers/fake-authentication-provider/fake-authentication-provider.module';
import { DefaultAuthenticationProviderModule } from './portal/security/authentication/providers/default-authentication-provider/default-authentication-provider.module';
import { Environment } from './public-api';


const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
    environment.useFakeAuthenticationProvider ? FakeAuthenticationProviderModule : DefaultAuthenticationProviderModule,
  ],
  exports: [
    NbAuthModule,
    CommonCoreModule,
    KendoComponentsModule,
    AppComponentsModule,
  ],
  declarations: [],
  providers: [
    // { provide: Environment, useValue: environment },
    ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        // { provide: Environment, useValue: environment },
      ],
    };
  }
}
