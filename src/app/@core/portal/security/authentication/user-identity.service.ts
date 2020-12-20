import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { UserIdentity } from '../types';

@Injectable({
    providedIn: 'root'
})
export class UserIdentityService {
    constructor(
        private authService: AuthenticationService,
    ) {
    }

    get user(): UserIdentity {
        // Since this method is called after User resolution,
        // We are sure that user promise is resolved, so it's type is UserIdentity
        return this.authService.getUser() as UserIdentity;
    }
}
