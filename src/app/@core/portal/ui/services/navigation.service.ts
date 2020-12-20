import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../../security/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {
  }

  goToDashboardPage() {
    this.router.navigate(['/user/dashboard']);
  }
  goToProfilePage() {
    this.router.navigate(['/user/profile']);
  }

  goToSignInPage() {
    this.router.navigateByUrl('login');
  }

  goToChooseOrganizationPage() {
    this.router.navigateByUrl('login/choose-organization');
  }

  goToSetPasswordPage() {
    this.router.navigateByUrl('login/change-password');
  }

  goToErrorPage() {
    this.router.navigateByUrl('internal-error');
  }

  isLoginPageRoute(route: ActivatedRouteSnapshot) {
    return this.checkRoutePageKey(route, 'login');
  }

  isChooseOrganizationRoute(route: ActivatedRouteSnapshot) {
    return this.checkRoutePageKey(route, 'choose-organization');
  }

  isChangePasswordRoute(route: ActivatedRouteSnapshot) {
    return this.checkRoutePageKey(route, 'change-password');
  }

  private checkRoutePageKey(route: ActivatedRouteSnapshot, pageKey: string) {
    return route.children &&
      route.children[0] &&
      route.children[0].data &&
      route.children[0].data.pageKey === pageKey;
  }

  async goToAppropriateSecurityPageOrDashboard() {
    if (this.authService.isUserAuthenticated) {
      const user = await this.authService.getUser();

      if (user.forcePasswordChange) {
        this.goToSetPasswordPage();
      } else if (typeof user.activeOrganizationId !== 'number') {
        this.goToChooseOrganizationPage();
      } else {
        this.goToDashboardPage();
      }
    } else {
      this.goToSignInPage();
    }
  }
}
