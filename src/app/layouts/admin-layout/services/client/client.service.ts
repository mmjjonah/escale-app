import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {api} from '../../../../config/api';
import {endpoints} from '../../../../config/endpoints';
import { ApiRes } from '../../../../shared/interfaces/api-res'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<ApiRes> {
    return this.http.get<ApiRes>(api.api_url + endpoints.client)
  }
}
