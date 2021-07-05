import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModalConfirmComponent} from '../../components/modal-confirm/modal-confirm.component';
import {ConfirmParams} from '../../interfaces/confirm-params';
import {ToastService} from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  spinner = new BehaviorSubject<boolean>(false)

  constructor(
    private matDialog: MatDialog
  ) { }

  confirm(data: ConfirmParams): Observable<boolean> {
    const ref = this.matDialog.open(ModalConfirmComponent, {
      width: '400px',
      data
    })
    return ref.afterClosed()
  }

  showSpinner() {
    this.spinner.next(true)
  }

  hideSpinner() {
    this.spinner.next(false)
  }

  /**
   * @author Jonathan
   * @description Téléchargement d'un fichier à partir d'un base64
   * @param contentType
   * @param base64Data
   * @param fileName
   */
  public downloadBase64File(contentType, base64Data, fileName) {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
