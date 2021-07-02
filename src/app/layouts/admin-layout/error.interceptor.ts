import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';
import {ToastrService} from 'ngx-toastr';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SessionService} from '../../shared/services/session/session.service';
import {ToastService} from '../../shared/services/toast/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toast$: ToastService,
    private router: Router,
    private session$: SessionService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.session$.token

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          Pragma: 'no-cache',
          Expires: '0'
        }
      })
    }
    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          if (
            err instanceof HttpErrorResponse
          ) {
            this.toast$.error('Erreur', getReasonPhrase(err.status))
            if (err.status === StatusCodes.NETWORK_AUTHENTICATION_REQUIRED) {
              this.session$.clearSession()
              this.router.navigate(['/auth'])
            }
          }
          return throwError(err);
        })
      );
  }
}
