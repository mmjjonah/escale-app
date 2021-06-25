import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {StatusCodes} from 'http-status-codes';
import {ToastrService} from 'ngx-toastr';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastService} from '../../shared/services/toast/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toast$: ToastService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          if (
            err instanceof HttpErrorResponse
            && err.status === StatusCodes.INTERNAL_SERVER_ERROR
          ) {
            this.toast$.error('Erreur', 'Erreur serveur')
          }
          return throwError(err);
        })
      );
  }
}
