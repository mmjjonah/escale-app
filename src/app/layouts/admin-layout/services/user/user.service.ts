import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {api} from '../../../../config/api';
import {endpoints} from '../../../../config/endpoints';
import { ApiRes } from '../../../../shared/interfaces/api-res'
import {User} from '../../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  getUsers(filter: any = {}): Observable<ApiRes> {
    return this.http.get<ApiRes>(api.api_url + endpoints.user, { params: filter })
  }
  createUser(data: User): Observable<ApiRes> {
    return this.http.post<ApiRes>(api.api_url + endpoints.user, data);
  }
  updateUser(pk: number, data: any): Observable<ApiRes> {
    return this.http.patch<ApiRes>(api.api_url + endpoints.user + '/' + pk, data)
  }
  deleteUser(pk: number): Observable<ApiRes> {
    return this.http.delete<ApiRes>(api.api_url + endpoints.user + '/' + pk)
  }
}
