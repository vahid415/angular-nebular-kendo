import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../../security/authentication/authentication.service';
import { NavigationService } from './../../../services/navigation.service';

@Component({
  selector: 'app-req-change-password',
  templateUrl: './req-change-password.component.html',
  styleUrls: ['./req-change-password.component.css']
})
export class PortalReqChangePasswordComponent implements OnInit {
  userName: string;
  constructor(private authService: AuthenticationService,
    private navService: NavigationService
  ) { }

  ngOnInit(): void {
  }
  async onFormSubmit() {
    this.authService.reqChangeUserPassword(this.userName)
      .subscribe(async res => {
        await this.navService.goToAppropriateSecurityPageOrDashboard();
      });
  }
}
