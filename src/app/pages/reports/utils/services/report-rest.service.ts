import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ReportExactitud, ReportRotacion} from '../../../../__entities/report';
import {environment} from '../../../../../environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});

@Injectable({
  providedIn: 'root',
})
export class ReportRestService {

  private urlExactitud = environment.apiUrl + '/inventory/exactitud/lote/';
  private urlRotacion = environment.apiUrl + '/inventory/rotacion/lote/';

  constructor(private httpClient: HttpClient) {
  }

  public getPresitionReportByIdLote(idLote = 1) {
    return this.httpClient.get<ReportExactitud>(this.urlExactitud + idLote, { headers : headers });
  }

  public getRotationReportByIdLote(idLote = 1) {
    return this.httpClient.get<ReportRotacion>(this.urlRotacion + idLote, { headers : headers });
  }
}
