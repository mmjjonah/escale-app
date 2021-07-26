import {Routes} from '@angular/router';
import {AccountComponent} from '../../pages/account/account.component';
import {ClientComponent} from '../../pages/client/client.component';
import {CommandComponent} from '../../pages/command/command.component';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {OperatorComponent} from '../../pages/operator/operator.component';
import {UserComponent} from '../../pages/user/user.component';
import {TableComponent} from '../../pages/table/table.component';
import {TypographyComponent} from '../../pages/typography/typography.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {NotificationsComponent} from '../../pages/notifications/notifications.component';
import {UpgradeComponent} from '../../pages/upgrade/upgrade.component';
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
      {path: 'table', component: TableComponent},
      {path: 'typography', component: TypographyComponent},
      {path: 'icons', component: IconsComponent},
      {path: 'notifications', component: NotificationsComponent},
      {path: 'upgrade', component: UpgradeComponent},
      {
        path: '**',
        redirectTo: 'chart'
      }
    ]
  },
];
