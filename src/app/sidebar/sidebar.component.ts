import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../shared/interfaces/user';
import {SessionService} from '../shared/services/session/session.service';
import {_c} from '../config/constants';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles: string[];
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard/chart',
    title: 'Dashboard',
    icon: 'nc-chart-bar-32',
    class: '',
    roles: [ _c.ADMIN ]
  },
  {
    path: '/dashboard/settings',
    title: 'Paramétrage',
    icon: 'nc-settings',
    class: '',
    roles: [_c.ADMIN]
  },
  {
    path: '/dashboard/account',
    title: 'Gestion des comptes',
    icon: 'nc-circle-10',
    class: '',
    roles: [ _c.ADMIN ]
  },
  {
    path: '/dashboard/command/' + _c.command_type.SIMPLE,
    title: 'Gestion de commande',
    icon: 'nc-paper',
    class: '',
    roles: [_c.ADMIN, _c.OPERATOR]
  },
  {
    path: '/dashboard/command/' + _c.command_type.SPECIAL,
    title: 'Spécial',
    icon: 'nc-bookmark-2',
    class: '',
    roles: [_c.ADMIN, _c.OPERATOR]
  },
  {
    path: '/dashboard/client',
    title: 'Gestion des clients',
    icon: 'nc-badge',
    class: '',
    roles: [_c.ADMIN]
  },
];

@Component({
  moduleId: module.id,
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];

  constructor(
    private session$: SessionService,
    public dialogRef: MatDialog
  ) {
  }

  get user(): User {
    return this.session$.getUserSession
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
