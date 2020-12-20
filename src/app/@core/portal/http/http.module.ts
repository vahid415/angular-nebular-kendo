import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PortalHttpInterceptor } from './http-interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: PortalHttpInterceptor,
            multi: true
        }
    ],
})
export class PortalHttpModule { }
