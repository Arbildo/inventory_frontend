import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductLose} from '../../../../__entities/product-lose';
import {environment} from '../../../../../environments/environment';
import {TodoService} from '../../../../todo.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});

@Injectable({
  providedIn: 'root',
})
export class ProductLoseService {

  private url = environment.apiUrl + '/tbl/perdida/';
  private urlReporte = environment.apiUrl + '/tbl/reporte-perdida/';

  constructor(private httpClient: HttpClient,
              private todoService: TodoService) {
  }

  public getProductLose(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<ProductLose[]>(this.url + '?' + queryParam,
      {headers : headers});
  }
  async createProductLoseEntry(data) {
    const request = {
      url: this.url + 'new',
      content: data,
      method: 'POST',
    };
    this.todoService.processRequest(request);
  }

  async updateProductLoseRegister(id, params) {
    const urlAprove = this.url + id + '/aprove';
    const request = {
      url: urlAprove,
      content: params,
      method: 'POST',
    };
    this.todoService.processRequest(request);
  }
  public getDatesForReport() {
    return this.httpClient.get<any>(this.url + 'dates', {headers: headers});
  }
  public getPerdidasForReport(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<ProductLose[]>(this.urlReporte + '?' + queryParam, {headers: headers});
  }
}


