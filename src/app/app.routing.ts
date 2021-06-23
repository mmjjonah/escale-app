import { Routes } from '@angular/router';
import {AdminGuard} from './guard/admin.guard';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    canActivateChild: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
