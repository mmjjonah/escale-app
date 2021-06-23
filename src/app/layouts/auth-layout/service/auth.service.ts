import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {api} from '../../../config/api';
import {endpoints} from '../../../config/endpoints';
import { ApiRes } from '../../../shared/interfaces/api-res';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(login: string, password: string): Observable<ApiRes> {
    return this.http.post<ApiRes>( api.api_url + endpoints.auth, { login, password} );
  }
}
