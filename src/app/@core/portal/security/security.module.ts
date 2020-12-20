import { NgModule } from '@angular/core';
import { UserIdentityService } from './authentication/user-identity.service';
import { PermissionDirective } from './authorization/permission.directive';

@NgModule({
  declarations: [
    PermissionDirective
  ],
  imports: [
  ],
  exports: [
    PermissionDirective
  ],
  providers: [
    UserIdentityService
  ],
})
export class SecurityModule { }
