import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AccountComponent} from '../../pages/account/account.component';
import {ModalEditPasswordComponent} from '../../pages/account/modal-edit-password/modal-edit-password.component';
import {ModalSingleAccountComponent} from '../../pages/account/modal-single-account/modal-single-account.component';
import {ClientComponent} from '../../pages/client/client.component';
import {CommandComponent} from '../../pages/command/command.component';
import {ModalRetourClientComponent} from '../../pages/command/modal-retour-client/modal-retour-client.component';
import {ModalSingleCommandComponent} from '../../pages/command/modal-single-command/modal-single-command.component';
import {ModalSingleGateauComponent} from '../../pages/command/modal-single-command/modal-single-gateau/modal-single-gateau.component';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {OperatorComponent} from '../../pages/operator/operator.component';
import {UserComponent} from '../../pages/user/user.component';
import {SpinnerComponent} from '../../shared/components/spinner/spinner.component';
import {FixedPluginModule} from '../../shared/fixedplugin/fixedplugin.module';
import {FooterModule} from '../../shared/footer/footer.module';
import {NavbarModule} from '../../shared/navbar/navbar.module';
import {getFrenchPaginatorIntl} from '../../shared/paginator/french-paginator-intl';
import {SharedServiceModule} from '../../shared/services/shared-service.module';
import {ToolsService} from '../../shared/services/tools/tools.service';
import {SidebarModule} from '../../sidebar/sidebar.module';
import {AdminLayoutComponent} from './admin-layout.component';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {ClientService} from './services/client/client.service';
import {CommandService} from './services/command/command.service';
import {UserService} from './services/user/user.service';
import {SettingsComponent} from '../../pages/settings/settings.component';
import {ModalSingleSettingComponent} from '../../pages/settings/modal-single-setting/modal-single-setting.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTooltipModule,
    SharedServiceModule,
  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UserComponent,
    OperatorComponent,
    AccountComponent,
    ModalSingleAccountComponent,
    ModalEditPasswordComponent,
    CommandComponent,
    ClientComponent,
    ModalSingleCommandComponent,
    ModalSingleGateauComponent,
    ModalRetourClientComponent,
    SpinnerComponent,
    SettingsComponent,
    ModalSingleSettingComponent
  ],
  providers: [
    UserService,
    ToolsService,
    CommandService,
    ClientService,
    {provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()},
  ]
})

export class AdminLayoutModule {
}
