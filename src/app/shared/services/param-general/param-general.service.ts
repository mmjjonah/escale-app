import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {api} from '../../../config/api';
import {endpoints} from '../../../config/endpoints';
import { ApiRes } from '../../interfaces/api-res'
import {ParamGen} from '../../interfaces/param-gen';
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

  getParams(params: any = {}): Observable<ApiRes> {
    return this.http.get<ApiRes>(`${api.api_url}${endpoints.param_gen}`, {
      params
    });
  }

  getCategories(): Observable<ApiRes> {
    return this.http.get<ApiRes>(`${api.api_url}${endpoints.param_gen}/param_categories`)
  }

  createParam(data: ParamGen): Observable<ApiRes> {
    return this.http.post<ApiRes>(`${api.api_url}${endpoints.param_gen}`, data)
  }

  updateParam(data: ParamGen): Observable<ApiRes> {
    return this.http.patch<ApiRes>(`${api.api_url}${endpoints.param_gen}`, data)
  }

  deleteParam(param_id: number | string): Observable<ApiRes> {
    return this.http.delete<ApiRes>(`${api.api_url}${endpoints.param_gen}/${param_id}`)
  }
}
