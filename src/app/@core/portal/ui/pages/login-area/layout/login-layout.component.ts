import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../../../services/navigation.service';
import { AuthenticationService } from '../../../../security/authentication/authentication.service';

@Component({
  selector: 'app-login-area-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: [ './login-layout.component.css' ],
})
export class PortalLoginAreaLayoutComponent implements OnInit {
  fullName: string;
  authenticated: boolean;

  constructor (
    private authService: AuthenticationService,
    private navService: NavigationService,
  ) {

  }

  async ngOnInit() {
    this.authService.signedIn.subscribe(async x => {
      let user = await this.authService.getUser();
      user = user instanceof Observable ? await user.toPromise() : user;
      this.fullName = user.fullName;
      this.authenticated = true;
    });

    this.authService.signedOut.subscribe(async x => {
      this.authenticated = false;
    });

    if (this.authService.isUserAuthenticated()) {
      const user = await this.authService.getUser();
      this.fullName = user.fullName;
      this.authenticated = true;
    }
  }

  onSignOutClick() {
    this.authService.signOut().subscribe(x => {
      this.navService.goToSignInPage();
    });
  }


}
