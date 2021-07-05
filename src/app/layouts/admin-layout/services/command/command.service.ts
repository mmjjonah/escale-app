import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {api} from '../../../../config/api';
import {endpoints} from '../../../../config/endpoints';
import {ApiRes} from '../../../../shared/interfaces/api-res'
import {Command} from '../../../../shared/interfaces/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(
    private http: HttpClient
  ) {
  }

  createOrUpdate(data: Command): Observable<ApiRes> {
    return this.http.put<ApiRes>(api.api_url + endpoints.command, data)
  }

  findAll(): Observable<ApiRes> {
    return this.http.get<ApiRes>(api.api_url + endpoints.command)
  }

  delete(id: number): Observable<ApiRes> {
    return this.http.delete<ApiRes>(api.api_url + endpoints.command + '/' + id)
  }

  addFeedback(data: { command_id: number, command_retour_client: string }): Observable<ApiRes> {
    return this.http.post<ApiRes>(api.api_url + endpoints.command_widget.addFeedback, data)
  }

  purchaseOrder(command_id: number): Observable<ApiRes> {
    return this.http.get<ApiRes>(api.api_url + endpoints.command_widget.purchaseOrder + '/' + command_id)
  }

  getGateauModel(gateau_id: string): Observable<ApiRes> {
    return this.http.get<ApiRes>(api.api_url + endpoints.command_widget.gateauModel + '/' + gateau_id)
  }
}
