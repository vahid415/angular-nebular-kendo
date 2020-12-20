import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { UserIdentity } from '../types';
import { McbRouteData } from '../../routing/types';
import { UIService } from '../../ui/services/ui.service';
import { LogService } from '../../../infra/shared/services/log.service';
import { FormState } from '../../../infra/shared/forms/state/form-state';
import { NavigationService } from '../../ui/services/navigation.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Environment, EnvironmentDescriptor } from '../../../infra/shared/types/environment';
import { TranslatorService } from './../../../infra/shared/localization/lang/translator.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  fakeAuthentication: boolean;
  constructor(
    private log: LogService,
    private formState: FormState,
    private tr: TranslatorService,
    private uiService: UIService,
    public navService: NavigationService,
    private authService: AuthenticationService,
    @Inject(Environment) private env: EnvironmentDescriptor,

  ) {
    this.fakeAuthentication = env.useFakeAuthenticationProvider;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateRoute(route, state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateRoute(childRoute, state);
  }

  private async canActivateRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authenticated = this.authService.isUserAuthenticated();

    if (authenticated) {
      const user = await this.authService.getUser();

      if (this.shouldRedirectToChangePasswordPage(user, route)) {
        this.navService.goToSetPasswordPage();
        return false;
      } else if (this.shouldRedirectToChooseOrganizationPage(user, route)) {
        this.navService.goToChooseOrganizationPage();
        return false;

      } else if (this.shouldRedirectToDashboardPage(user, route)) {
        this.navService.goToDashboardPage();
        return false;
      } else if (!this.hasUserPermissionToViewPage(user, route)) {
        this.uiService.showToast('youHaveNoPermissionToViewPage', { style: 'error', timer: 4000 });
        this.log.write('you have no permission to access to this route:', route);
        return false;
      }
      // else if (!this.formStateChecking()) {
      //   return false;
      // }
    } else {
      const goingToSigningPage = this.navService.isLoginPageRoute(route);
      if (!goingToSigningPage) {
        this.navService.goToSignInPage();
        return false;
      }
    }

    return true;
  }

  private shouldRedirectToDashboardPage(user: UserIdentity, route: ActivatedRouteSnapshot) {
    return (user.activeOrganizationId && this.navService.isChooseOrganizationRoute(route)) ||
      (!user.forcePasswordChange && this.navService.isChangePasswordRoute(route)) ||
      (user && this.navService.isLoginPageRoute(route));
  }

  private shouldRedirectToChooseOrganizationPage(user: UserIdentity, route: ActivatedRouteSnapshot) {
    return !user.activeOrganizationId &&
      !user.forcePasswordChange &&
      !this.navService.isChooseOrganizationRoute(route);
  }

  private shouldRedirectToChangePasswordPage(user: UserIdentity, route: ActivatedRouteSnapshot) {
    return user.forcePasswordChange &&
      !this.navService.isChangePasswordRoute(route);
  }

  private hasUserPermissionToViewPage(user: UserIdentity, route: ActivatedRouteSnapshot) {
    let currentState = route;
    do {
      const data: McbRouteData = currentState.data;
      const perm = data.permission;
      if (typeof perm === 'string' || Array.isArray(perm)) {
        if (!user.hasPermission(perm) && !this.fakeAuthentication) {
          return false;
        }
      }
      currentState = currentState.children[0];
    } while (currentState);
    return true;
  }

  private formStateChecking() {
    if (this.formState.saved) {
      return true;
    } else {
      const answer = confirm(this.tr.translate('changes-are-not-saved'));
      this.formState.saved = answer; // We do not show this message again, unless a form 'change' event raises again
      return answer;
    }
  }
}
