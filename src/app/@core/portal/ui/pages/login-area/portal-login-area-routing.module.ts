import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PortalLoginComponent } from './login/login.component';
import { PortalLoginAreaLayoutComponent } from './layout/login-layout.component';
import { PortalLoginChooseOrganizationComponent } from './choose-organization/choose-organization.component';
import { PortalLoginChangePasswordComponent } from './change-password/change-password.component';
import { AuthorizationGuard } from '../../../security/authorization/authorization-guard';
import { PortalReqChangePasswordComponent } from './req-change-password/req-change-password.component';

const routes: Routes = [
    {
        path: '',
        component: PortalLoginAreaLayoutComponent,
        canActivate: [AuthorizationGuard],
        children: [
            {
                path: '',
                component: PortalLoginComponent,
                data: {
                    pageKey: 'login'
                }
            },
            {
                path: 'choose-organization',
                component: PortalLoginChooseOrganizationComponent,
                data: {
                    pageKey: 'choose-organization'
                }
            },
            {
                path: 'change-password',
                component: PortalLoginChangePasswordComponent,
                data: {
                    pageKey: 'change-password'
                }
            },
            {
                path: 'req-change-password',
                component: PortalReqChangePasswordComponent,
                data: {
                    pageKey: 'req-change-password'
                }
            },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PortalLoginAreaRoutingModule {
}
