import {Routes} from '@angular/router';
import {AccountComponent} from '../../pages/account/account.component';
import {ClientComponent} from '../../pages/client/client.component';
import {CommandComponent} from '../../pages/command/command.component';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {OperatorComponent} from '../../pages/operator/operator.component';
import {UserComponent} from '../../pages/user/user.component';
import {AdminLayoutComponent} from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: 'chart', component: DashboardComponent},
      {path: 'account', component: AccountComponent},
      {path: 'command/:command_type', component: CommandComponent},
      {path: 'operator', component: OperatorComponent},
      {path: 'client', component: ClientComponent},
      {path: 'user', component: UserComponent},
      {
        path: '**',
        redirectTo: 'chart'
      }
    ]
  },
];
