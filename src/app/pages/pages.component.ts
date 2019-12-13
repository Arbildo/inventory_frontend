import { Component } from '@angular/core';

import { MENU_ITEMS_JEFE_ALMACENERO, MENU_ITEMS_ALMACENERO } from './pages-menu';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu;
  constructor(private authService: AuthService) {
    if (authService.currentUserRole.nombre === 'JEFE ALMACENERO') {
      this.menu = MENU_ITEMS_JEFE_ALMACENERO;
    }
    if (authService.currentUserRole.nombre === 'ALMACENERO') {
      this.menu = MENU_ITEMS_ALMACENERO;
    }
  }
  // menu = MENU_ITEMS;
}
