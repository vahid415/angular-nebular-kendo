import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EnvironmentDescriptor, Environment } from '../../../../../infra/shared/types/environment';
import { AuthenticationProvider, SigningModel, UserIdentity, OrganizationDto } from '../../../types';

@Injectable()
export class DefaultAuthenticationProviderService implements AuthenticationProvider {
  baseUrl = 'api/infrastructure-security/';
  // baseUrl = 'security/';

  constructor(
    @Inject(Environment) private env: EnvironmentDescriptor,
    private httpClient: HttpClient,
    private injector: Injector
  ) {
  }

  changeUserPassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'set-password', {
      currentPassword,
      newPassword
    });
  }

  reqChangeUserPassword(userName: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'set-password', {
      userName
    });
  }

  getCaptcha(): Observable<Blob> {
    return this.httpClient.post('resource/get-captcha', {}, { responseType: 'blob' });
  }

  signIn(signingModel: SigningModel) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Basic ${btoa('navaco-client' + ':' + 'navaco-secret')}`);
    const body = new FormData();
    body.append('username', signingModel.username);
    body.append('password', signingModel.password);
    body.append('captcha', signingModel.captcha);
    body.append('grant_type', 'password');
    return this.httpClient.post<any>('auth/login', body, { headers })
      .pipe(
        concatMap(res => this.httpClient.post('resource/set-cookie', {}))
      );
  }

  getUser(): Observable<UserIdentity> {
    return this.httpClient.post<any>(this.baseUrl + 'get-user-info', {})
      .pipe(
        map(x => {
          return new UserIdentity(
            x.firstName,
            x.lastName,
            Array.isArray(x.activities) ? x.activities : [],
            x.forcePasswordChange,
            x.activeOrganization ? x.activeOrganization.id : null,
            x.activeOrganization ? x.activeOrganization.title : null);
        })
      );
  }

  getUserOrganizations(): Promise<OrganizationDto[]> {
    return this.httpClient.post<any>(this.baseUrl + 'get-user-orgs', {}).toPromise();
  }

  setUserOrganization(organizationId: number) {
    return this.httpClient.post<any>(this.baseUrl + 'set-active-org', organizationId);
  }

  signOut() {
    return this.httpClient.post(this.baseUrl + 'logout', {})
      .pipe(
        map(res => true)
      );
  }

  isUserAuthenticated() {
    const parts = document.cookie.split(';');
    for (const part of parts) {
      const keyValue = part.split('=');
      if (keyValue.length === 2) {
        const key = keyValue[0].trim();
        const value = keyValue[1].trim();
        if (key === 'access_token' && typeof value === 'string') {
          return true;
        }
      }
    }

    return false;
  }
}
