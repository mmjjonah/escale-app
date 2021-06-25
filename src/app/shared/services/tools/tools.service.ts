import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {ModalConfirmComponent} from '../../components/modal-confirm/modal-confirm.component';
import {ConfirmParams} from '../../interfaces/confirm-params';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(
    private matDialog: MatDialog,
  ) { }
  confirm(data: ConfirmParams): Observable<boolean> {
    const ref = this.matDialog.open(ModalConfirmComponent, {
      width: '400px',
      data
    })
    return ref.afterClosed()
  }
}
