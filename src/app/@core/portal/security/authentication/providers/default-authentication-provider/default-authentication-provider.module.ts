import { NgModule } from '@angular/core';
import { AuthenticationProvider } from '../../../types';
import { DefaultAuthenticationProviderService } from './default-authentication-provider.service';

@NgModule({
  providers: [
    { provide: AuthenticationProvider, useClass: DefaultAuthenticationProviderService, multi: false }
  ],
})
export class DefaultAuthenticationProviderModule { }
