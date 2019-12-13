import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {TodoService} from '../../../../todo.service';
import {Pedido, DetallePedido} from '../../../../__entities/pedido';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});

@Injectable({
  providedIn: 'root',
})
export class ProductOutputService {

  private url = environment.apiUrl + '/tbl/pedido/';
  private urlPedido = environment.apiUrl + '/tbl/reporte-pedido/';
  private urlDetail = environment.apiUrl + '/tbl/detalle/pedido/';

  constructor(private httpClient: HttpClient,
              private todoService: TodoService) {
  }

  async makeBuying(data) {
    const request = {
      url: this.url + 'new',
      content: data,
      method: 'POST',
    };
    this.todoService.processRequest(request);
  }

  public getPedidos(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<Pedido[]>(this.url + '?' + queryParam,
      {headers : headers});
  }

  public getDetailsBy(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<DetallePedido[]>(this.urlDetail + '?' + queryParam,
      {headers : headers});
  }
  public getDatesForReport() {
    return this.httpClient.get<any>(this.url + 'dates', {headers: headers});
  }
  public getPedidosForReport(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<DetallePedido[]>(this.urlPedido + '?' + queryParam, {headers: headers});
  }
}
