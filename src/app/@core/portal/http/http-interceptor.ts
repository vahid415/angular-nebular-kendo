import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';

import { ResponseCodes } from './types';
import { TemporaryHttpHeaderKeys } from './types';
import { UIService } from '../ui/services/ui.service';
import { NavigationService } from '../ui/services/navigation.service';
import { AuthenticationService } from '../security/authentication/authentication.service';

@Injectable()
export class PortalHttpInterceptor implements HttpInterceptor {
  constructor(
    private ui: UIService,
    private authService: AuthenticationService,
    private navService: NavigationService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = request.headers;
    const body = request.body;
    const emptyOrStringContent = body === undefined || body === null || typeof body === 'string';
    const displayServerErrorsHeader = request.headers.get(TemporaryHttpHeaderKeys.DisplayServerErrors);
    const afterUnauthorizedErrorHeader = request.headers.get(TemporaryHttpHeaderKeys.AfterUnauthorizedError);
    const displayServerErrors = (displayServerErrorsHeader !== 'False');
    const goToLoginPageAfterUnauthorizedError = (afterUnauthorizedErrorHeader !== 'Nothing');

    if (emptyOrStringContent) {
      headers = request.headers.set('Content-Type', 'application/json');
    }

    headers = request.headers.delete(TemporaryHttpHeaderKeys.DisplayServerErrors);
    headers = request.headers.delete(TemporaryHttpHeaderKeys.AfterUnauthorizedError);
    request = request.clone({ headers });
    this.ui.showLoading();
    return next.handle(request)
      .pipe(
        map((event: any) => {
          if (event instanceof HttpResponse) {
            const responseBody = event.body;
            if (responseBody && typeof responseBody.code === 'number') {
              if (responseBody.code === ResponseCodes.OK) {
                return event.clone({ body: responseBody.response });
              }

              if (responseBody.code === ResponseCodes.Unauthorized) {
                this.authService.clearUser();
                if (goToLoginPageAfterUnauthorizedError) {
                  this.navService.goToSignInPage();
                }
              }

              throw responseBody.response;
            }
            this.ui.showLoading(false);
          }

          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error && displayServerErrors) {
            this.ui.showToast(error.message, { style: 'error' });
          }
          this.ui.showLoading(false);
          return throwError(error);
        }),
        finalize(() => {
          this.ui.showLoading(false);
        })
      );
  }
}
