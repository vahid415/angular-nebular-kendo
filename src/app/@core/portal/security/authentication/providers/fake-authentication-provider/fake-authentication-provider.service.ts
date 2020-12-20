import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticationProvider, UserIdentity, SigningModel, OrganizationDto } from '../../../types';

@Injectable()
export class FakeAuthenticationProviderService implements AuthenticationProvider {
  private user = new UserIdentity('Admin', 'LastName', ['/', 'p1', 'p2'], false, 1, 'org 1');
  readonly accessTokenLocalStorageKey = 'access_token';

  constructor(private httpClient: HttpClient) {
  }

  changeUserPassword(currentPassword: string, newPassword: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    this.user = new UserIdentity('Admin', 'LastName', ['/', 'p1', 'p2'], false, this.user.activeOrganizationId, this.user.activeOrganizationTitle);
    return of(true);
  }

  reqChangeUserPassword(userName: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    this.user = new UserIdentity('Admin', 'LastName', ['/', 'p1', 'p2'], false, this.user.activeOrganizationId, this.user.activeOrganizationTitle);
    return of(true);
  }

  signIn(signingModel: SigningModel) {
    console.log('FakeAuthProvider: Signed In.');
    localStorage.setItem(this.accessTokenLocalStorageKey, 'FAKE_ACCESS_TOKEN');
    return of(true);
  }

  getCaptcha(): Observable<Blob> {
    console.log('FakeAuthProvider: Captcha Retrieved.');
    return this.httpClient.get('assets/template/img/captcha.png', { responseType: 'blob' });
  }

  getUser(): Observable<UserIdentity> {
    return of(this.user);
  }

  getUserOrganizations(): Promise<OrganizationDto[]> {
    return of([
      {
        id: 1,
        title: 'Org1'
      },
      {
        id: 2,
        title: 'Org2'
      }
    ]).toPromise();
  }

  setUserOrganization(organizationId: number) {
    this.user = new UserIdentity('Admin', 'LastName', ['/', 'p1', 'p2'], this.user.forcePasswordChange, 1, 'Org1');
    return of(true);
  }

  signOut() {
    console.log('FakeAuthProvider: Signed Out.');
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    return of(0);
  }

  isUserAuthenticated() {
    return localStorage.getItem(this.accessTokenLocalStorageKey) != null;
  }
}
