import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../security/authentication/authentication.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'mcb-portal-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class PortalLoginChangePasswordComponent {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;

  constructor(
    private authService: AuthenticationService,
    private navService: NavigationService) {
  }

  onFormSubmit() {
    this.authService.changeUserPassword(this.currentPassword, this.newPassword).subscribe(x => {
      this.navService.goToAppropriateSecurityPageOrDashboard();
    });
  }
}
