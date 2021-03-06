import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalConfirmComponent} from '../components/modal-confirm/modal-confirm.component';
import {ParamGeneralService} from './param-general/param-general.service';
import {SessionService} from './session/session.service';
import {ToastService} from './toast/toast.service';
import {ToolsService} from './tools/tools.service';

@NgModule({
  declarations: [
    ModalConfirmComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  providers: [
    SessionService,
    ToolsService,
    ToastService,
    ParamGeneralService
  ]
})
export class SharedServiceModule { }
