import { RouterModule, Route, Routes } from '@angular/router';
import { McbRoutes } from './types';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterOutletDirective } from './router-outlet.directive';
// import { FormDeactivationGuard } from '../forms/form-deactivation-guard';

@NgModule({
    declarations: [
        RouterOutletDirective
    ],
    exports: [
        RouterOutletDirective
    ]
})
export class McbRouterModule {
    // static forRoot(routes: McbRoutes) {
    //     return RouterModule.forRoot(routes);
    // }

    static forChild(routes: McbRoutes): ModuleWithProviders<RouterModule> {
        return RouterModule.forChild(routes);
    }

    static init() {
        return RouterModule.forRoot([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            }
        ]);
    }

    static forSubsystem(routes: McbRoutes) {
        // this.attachFormDeactivationGaurdToRoutes(routes);
        return RouterModule.forChild(routes);
    }

    // private static attachFormDeactivationGaurdToRoutes(routes: McbRoutes) {
    //     routes
    //         .forEach(r => {
    //             if (r.component) {
    //                 (r as any).canDeactivate = [FormDeactivationGuard];
    //             }
    //             if (Array.isArray(r.children)) {
    //                 this.attachFormDeactivationGaurdToRoutes(r.children);
    //             }
    //         });
    // }
}
