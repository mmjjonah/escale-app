import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr$: ToastrService
  ) { }

  info(title: string, message: string) {
    this.toastr$.info(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>${title}</b> - ${message}</span>`,
      '',
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-info alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
  }
  success(title: string, message: string) {
    this.toastr$.success(
      `<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message"><b>${title}</b> - ${message}</span>`,
      '',
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-success alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
  }
  error(title: string, message: string) {
    this.toastr$.error(
      `<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message"><b>${title}</b> - ${message}</span>`,
      '',
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-error alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
  }
  warning(title: string, message: string) {
    this.toastr$.warning(
      `<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message"><b>${title}</b> - ${message}</span>`,
      '',
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-warning alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
  }
}
