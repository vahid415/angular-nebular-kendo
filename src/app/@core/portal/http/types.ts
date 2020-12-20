import { InjectionToken } from '@angular/core';

export const ServiceHostToken = new InjectionToken('ServiceHost');

export interface HttpOptions {
    query?: any;
    pathType?: 'relative' | 'absolute';
    responseType?: 'json' | 'blob';
    contentType?: 'json' | 'multipart/form-data';
    displayServerErrors?: boolean;
    goToLoginPageAfterUnauthorizedError?: boolean;
}

export enum TemporaryHttpHeaderKeys {
    DisplayServerErrors = 'Display-Server-Errors',
    AfterUnauthorizedError = 'After-Unauthorized-Error',
}

export enum ResponseCodes {
    OK = 0,
    Unauthorized = 401
}
