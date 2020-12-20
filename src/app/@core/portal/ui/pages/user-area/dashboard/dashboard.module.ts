import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonCoreModule } from '../../../../../infra/shared/common-core.module';
import { KendoComponentsModule } from '../../../../../infra/components/kendo/kendo.module';
import { AppComponentsModule } from '../../../../../infra/components/mcb/app-components.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        CommonCoreModule,
        KendoComponentsModule,
        AppComponentsModule,
        NgbDatepickerModule,
        DashboardRoutingModule
    ],
    providers: [
    ]
})
export class DashboardModule {
}
