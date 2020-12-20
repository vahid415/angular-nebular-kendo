import { now } from 'moment-jalaali';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap';

import { DashboardService } from './dashboard.service';
import { BreadcrumbItem } from '../../../../decorators/types';
import { Breadcrumb } from '../../../../decorators/breadcrumb.decorator';
import { McbDate } from '../../../../../infra/shared/localization/date/date';
import { UserIdentityService } from '../../../../security/authentication/user-identity.service';
import { NgbDatepickerI18nPersian } from '../../../../../infra/shared/localization/date/ngb-date-picker-i18n-persian';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
  ]
})
export class DashboardComponent implements OnDestroy {
  @Breadcrumb() breadcrumb: BreadcrumbItem = { textKey: 'dashboard' };
  fullname: string;
  organizationTitle: string;
  date: McbDate;
  dateSubscription: Subscription;

  constructor (
    private service: DashboardService,
    private router: Router,
    userService: UserIdentityService) {
    const user = userService.user;
    this.fullname = user.fullName;
    this.organizationTitle = user.activeOrganizationTitle;
    this.date = McbDate.clientDate();
    this.dateSubscription = interval(1000).subscribe(() => {
      this.date = McbDate.clientDate();
    });
  }

  get jalaaliDateString() {
    return this.date.formatJalaali();
  }

  get time() {
    return this.date.formatJalaali('HH:mm:ss');
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
