import { Injectable } from '@angular/core';
import { LoadChildren } from '@angular/router';
import { Dictionary } from '../../infra/shared/localization/types';
import { EnvironmentDescriptor } from './../../infra/shared/types/environment';
import { McbRoutes } from '../routing/types';

export const LOCALIZED_MENU_ITEM_TITLE_SYMBOL = Symbol('LOCALIZED_MENU_ITEM_TITLE');
export const SUBSYSTEM_USECASES_ROUTES = [];

@Injectable()
export class Subsystem {
    id: string;
    titleKey?: string;
    icon?: string;
    environment: EnvironmentDescriptor;
    faIcon?: string; /** Fontawesome Icon name. */
    menuItems?: MenuItem[];
    dictionaries?: Dictionary[];
    externalRoutes?: McbRoutes | SubsystemExternalRouteConfig;
}

export interface WorkflowStateProcessorRoute {
    id: string;
    titleKey: string;
    path: string;
    loadChildren: LoadChildren;
}

export type WorkflowStateProcessorRoutes = WorkflowStateProcessorRoute[];

export interface SubsystemExternalRouteConfig {
    stateProcessorsRoutes: WorkflowStateProcessorRoutes;
    usecasesRoutes: McbRoutes;
}

// Menu Items
export interface MenuItem {
    id?: string; // for backward compatibility
    code: number;
    titleKey: string;
    icon?: string;
    /** Fontawesome Icon name. */
    faIcon?: string;
    children?: MenuItem[];
    permission?: string | string[];
    path?: string;
}

export type MenuItems = MenuItem[];
