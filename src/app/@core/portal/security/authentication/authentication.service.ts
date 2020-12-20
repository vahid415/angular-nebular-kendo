import { Subject } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { Injectable, Injector, Optional } from '@angular/core';
import { UserIdentity, AuthenticationProvider, SigningModel, OrganizationDto } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: UserIdentity | Promise<UserIdentity>;
  private signedInSubject = new Subject<any>();
  private signedOutSubject = new Subject<any>();
  signedIn = this.signedInSubject.asObservable();
  signedOut = this.signedOutSubject.asObservable();

  constructor(
    injector: Injector,
    @Optional() private authProvider: AuthenticationProvider,
  ) {
    if (!authProvider) {
      throw new Error('No authentication provider is registerd.');
    }
  }

  getCaptcha() {
    return this.authProvider.getCaptcha();
  }

  signIn(signingModel: SigningModel) {
    return this.authProvider.signIn(signingModel).pipe(
      tap(res => {
        this.signedInSubject.next();
      })
    );
  }

  signOut() {
    return this.authProvider.signOut().pipe(
      tap(x => {
        this.user = null;
        this.signedOutSubject.next();
      })
    );
  }

  reqChangeUserPassword(userName: string) {
    return this.authProvider.reqChangeUserPassword(userName);
  }

  changeUserPassword(currentPassword: string, newPassword: string) {
    return this.authProvider.changeUserPassword(currentPassword, newPassword)
      .pipe(
        concatMap(x => {
          return this.getUser(true) as Promise<any>;
        })
      );
  }

  isUserAuthenticated() {
    return this.authProvider.isUserAuthenticated();
  }

  getUser(forceReload = false): UserIdentity | Promise<UserIdentity> {
    if (!this.isUserAuthenticated()) {
      throw Error('invalid operation. user is not authenticated.');
    }

    if (forceReload) {
      this.user = null;
    }

    if (this.user) {
      return this.user;
    } else {
      this.user = this.authProvider.getUser().toPromise();
      this.user.then(x => this.user = x);
      return this.user;
    }
  }

  getUserOrganizations() {
    return this.authProvider.getUserOrganizations();
  }

  setUserOrganization(org: OrganizationDto) {
    return this.authProvider.setUserOrganization(org.id)
      .pipe(
        concatMap(x => {
          return this.getUser(true) as Promise<any>;
        })
      );
  }

  clearUser() {
    this.user = null;
  }
}
