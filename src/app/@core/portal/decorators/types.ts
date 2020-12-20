import { ActivatedRoute } from '@angular/router';
export const BREADCRUMB_SYMBOL = Symbol('Breadcrumb');

export interface BreadcrumbItem {
    textKey?: string;
    text?: string;
    path?: any[];
    relativeTo?: ActivatedRoute;
    show?: boolean;
}

export type BreadcrumbItems = BreadcrumbItem[];
