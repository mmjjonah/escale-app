import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountComponent} from '../../pages/account/account.component';
import {ModalEditPasswordComponent} from '../../pages/account/modal-edit-password/modal-edit-password.component';
import {ModalSingleAccountComponent} from '../../pages/account/modal-single-account/modal-single-account.component';
import {OperatorComponent} from '../../pages/operator/operator.component';
import {FixedPluginModule} from '../../shared/fixedplugin/fixedplugin.module';
import {FooterModule} from '../../shared/footer/footer.module';
import {NavbarModule} from '../../shared/navbar/navbar.module';
import {ToolsService} from '../../shared/services/tools/tools.service';
import {SidebarModule} from '../../sidebar/sidebar.module';
import {AdminLayoutComponent} from './admin-layout.component';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './services/user/user.service';

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
  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    OperatorComponent,
    AccountComponent,
    ModalSingleAccountComponent,
    ModalEditPasswordComponent,
  ],
  providers: [
    UserService,
    ToolsService,
  ]
})

export class AdminLayoutModule {}
