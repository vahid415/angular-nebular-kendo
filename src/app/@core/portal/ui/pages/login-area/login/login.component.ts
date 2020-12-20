import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { SigningModel } from '../../../../security/types';
import { NavigationService } from '../../../services/navigation.service';
import { AuthenticationService } from '../../../../security/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class PortalLoginComponent {
  signingModel: SigningModel = {} as any;
  captcha: Blob;
  loading: boolean;

  constructor(
    private authService: AuthenticationService,
    private httpClient: HttpClient,
    private navService: NavigationService) {
    this.reloadCaptcha();
  }

  async onFormSubmit() {
    try {
      this.loading = true;
      await this.authService.signIn(this.signingModel).toPromise();
      this.loading = false;
      await this.navService.goToAppropriateSecurityPageOrDashboard();
    } catch {
      this.loading = false;
      // this.signingModel.captcha = '';
      // this.signingModel.password = '';
      this.reloadCaptcha();
    }
  }

  reloadCaptcha() {
    this.authService.getCaptcha().subscribe(x => {
      this.captcha = x;
    }, (error) => {
   // TODO   for test
      this.httpClient.get('assets/template/img/captcha.png', { responseType: 'blob' }).subscribe((res) => this.captcha = res);
    });
  }
}
