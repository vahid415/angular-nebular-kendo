import { Observable } from 'rxjs';

export interface SigningModel {
    username?: string;
    password?: string;
    captcha?: string;
}

export interface OrganizationDto {
    id: number;
    title: string;
}

export abstract class AuthenticationProvider {
    abstract getCaptcha(): Observable<Blob>;
    abstract signIn(signingModel: SigningModel): Observable<any>;
    abstract getUserOrganizations(): Promise<OrganizationDto[]>;
    abstract setUserOrganization(organizationId: number): Observable<any>;
    abstract changeUserPassword(currentPassword: string, newPassword: string): Observable<any>;
    abstract reqChangeUserPassword(userName: string): Observable<any>;
    abstract getUser(): Observable<UserIdentity>;
    abstract isUserAuthenticated(): boolean;
    abstract signOut(): Observable<any>;
}

export class UserIdentity {
    readonly firstName: string;
    readonly lastName: string;
    readonly permissions: string[];
    readonly forcePasswordChange: boolean;
    readonly activeOrganizationId: number;
    readonly activeOrganizationTitle: string;

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(
        firstName: string,
        lastName: string,
        permissions: string[],
        forcePasswordChange: boolean,
        activeOrganizationId: number,
        activeOrganizationTitle: string) {
debugger
        if (!Array.isArray(permissions)) {
            throw new Error('invalid or null parameter: permissions');
        }

        this.firstName = firstName;
        this.lastName = lastName;
        this.permissions = permissions;
        this.activeOrganizationId = activeOrganizationId;
        this.activeOrganizationTitle = activeOrganizationTitle;
        this.forcePasswordChange = forcePasswordChange;
    }

    hasPermission(permission: string | string[]): boolean {
        if (typeof permission === 'string') {
            return this.permissions.some(x => x.toLowerCase() === permission.toLowerCase());
        } else if (Array.isArray(permission)) {
            if (permission.length === 0) {
                return true;
            }

            for (const item of permission) {
                if (this.permissions.some(x => x.toLowerCase() === item.toLowerCase())) {
                    return true;
                }
            }

            return false;
        } else {
            throw Error('invalid value for parameter: permission');
        }
    }
}
