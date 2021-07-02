import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {api} from '../../../config/api';
import {endpoints} from '../../../config/endpoints';
import { ApiRes } from '../../interfaces/api-res'
@Injectable({
  providedIn: 'root'
})
export class ParamGeneralService {

  constructor(
    private http: HttpClient
  ) { }
  getParamByCode(param_code: string): Observable<ApiRes> {
    return this.http.get<ApiRes>(`${api.api_url}${endpoints.param_gen}/param_code/${param_code}`)
  }
  getParamByCategories(param_categories: string): Observable<ApiRes> {
    return this.http.get<ApiRes>(`${api.api_url}${endpoints.param_gen}/param_categories/${param_categories}`)
  }
}
