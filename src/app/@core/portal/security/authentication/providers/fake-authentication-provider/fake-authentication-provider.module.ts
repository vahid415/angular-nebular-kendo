import { NgModule } from '@angular/core';
import { FakeAuthenticationProviderService } from './fake-authentication-provider.service';
import { AuthenticationProvider } from '../../../types';

@NgModule({
  providers: [
    { provide: AuthenticationProvider, useClass: FakeAuthenticationProviderService, multi: false }
  ],
})
export class FakeAuthenticationProviderModule {
  constructor () {
    debugger
  }
}
