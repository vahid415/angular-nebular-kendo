import { Injectable } from '@angular/core';

import {
Subsystem, MenuItems, LOCALIZED_MENU_ITEM_TITLE_SYMBOL,
    SUBSYSTEM_USECASES_ROUTES, SubsystemExternalRouteConfig } from './types';
import { TranslatorService } from '../../infra/shared/localization/lang/translator.service';

@Injectable({
    providedIn: 'root'
})
export class SubsystemManager {
    readonly subsystems = new Array<Subsystem>();

    constructor(
        private translator: TranslatorService
    ) {
    }

    // register(subsystem: Subsystem, externalRoutes?: SubsystemExternalRouteConfig);
    // register(subsystem: Subsystem, usecasesRoutes?: McbRoutes);
    register(subsystem: Subsystem, routes?: SubsystemExternalRouteConfig) {
        this.validateSubsystem(subsystem);
        this.localizeSubsystem(subsystem);

        subsystem.externalRoutes = routes;
        this.subsystems.push(subsystem);

        // Register usecases routes
        if (Array.isArray(routes)) {
            routes.forEach(x => SUBSYSTEM_USECASES_ROUTES.push(x));
        } else if (typeof routes === 'object') {
            routes.usecasesRoutes.forEach(x => SUBSYSTEM_USECASES_ROUTES.push(x));
        }
    }

    private localizeSubsystem(ss: Subsystem) {
        const localizeMenuItems = (items: MenuItems) => {
            for (const item of items) {
                item[LOCALIZED_MENU_ITEM_TITLE_SYMBOL] = this.translator.translate(item.titleKey, ss);

                if (Array.isArray(item.children)) {
                    localizeMenuItems(item.children);
                }
            }
        };

        if (Array.isArray(ss.menuItems)) {
            localizeMenuItems(ss.menuItems);
        }
    }

    private validateSubsystem(ss: Subsystem) {
        // Do Validation here
    }
}
