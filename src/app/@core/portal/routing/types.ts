import { Route, LoadChildren } from '@angular/router';
import { Type } from '@angular/core';

export interface McbRouteData {
    permission?: string | string[];
}

export interface McbRoute {
    path?: string;
    component?: Type<any>;
    children?: McbRoutes;
    loadChildren?: LoadChildren;
    data?: McbRouteData;
    redirectTo?: string;
}

export declare type McbRoutes = McbRoute[];

// export interface InfrastructureRoutings {
//     dashboard: McbRoute;
//     access: McbRoute;
// }

