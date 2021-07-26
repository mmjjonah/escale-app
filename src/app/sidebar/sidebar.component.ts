import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
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
  // {
  //   path: '/dashboard/icons',
  //   title: 'Icons',
  //   icon: 'nc-diamond',
  //   class: '',
  //   roles: [_c.ADMIN]
  // },
  // {path: '/dashboard/maps', title: 'Maps', icon: 'nc-pin-3', class: ''},
  // {path: '/dashboard/notifications', title: 'Notifications', icon: 'nc-bell-55', class: ''},
  // {path: '/dashboard/user', title: 'User Profile', icon: 'nc-single-02', class: ''},
  // {path: '/dashboard/table', title: 'Table List', icon: 'nc-tile-56', class: ''},
  // {path: '/dashboard/typography', title: 'Typography', icon: 'nc-caps-small', class: ''},
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
    private router: Router,
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
