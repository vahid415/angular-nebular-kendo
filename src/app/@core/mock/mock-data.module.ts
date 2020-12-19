import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';

import { TrafficListService } from './traffic-list.service';
import { PeriodsService } from './periods.service';

import { SolarService } from './solar.service';


const SERVICES = [
  UserService,

  TrafficListService,
  PeriodsService,
  SolarService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
