import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <app-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
