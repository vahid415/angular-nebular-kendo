import { Directive, TemplateRef, ViewContainerRef, Input, Inject } from '@angular/core';

import { UserIdentityService } from '../authentication/user-identity.service';
import { EnvironmentDescriptor, Environment } from '../../../infra/shared/types/environment';
@Directive({
  selector: '[mcbPermission]',
  exportAs: 'mcbPermission',
})
export class PermissionDirective {
  private viewCreated: boolean;
  fakeAuthentication: boolean;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userIdentityService: UserIdentityService,
    @Inject(Environment) public env: EnvironmentDescriptor
    ) {
      this.fakeAuthentication = env.useFakeAuthenticationProvider;
  }

  @Input() set mcbPermission(permission: string | string[]) {
    const granted = this.userIdentityService.user.hasPermission(permission);
    // const fake = this.subsystem.environment ? this.subsystem.environment.useFakeAuthenticationProvider : true;
    if (!this.fakeAuthentication) {
      if (granted && !this.viewCreated) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.viewCreated = true;
      } else if (!granted && this.viewCreated) {
        this.viewContainer.clear();
        this.viewCreated = false;
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.viewCreated = true;
    }
  }
}
