import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from '../../shared/services/session/session.service';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(
    private session$: SessionService
  ) {}

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
    return next.handle(request);
  }
}
