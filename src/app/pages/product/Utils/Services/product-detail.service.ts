import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../../../../__entities/product';
import {Injectable} from '@angular/core';
import {ProductDetail, State} from '../../../../__entities/ProductDetail';
import {environment} from '../../../../../environments/environment';
import { TodoService } from '../../../../todo.service';
const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {

  private url = environment.apiUrl + '/tbl/productos/detalle/';
  private urlProductDetailStates = environment.apiUrl + '/tbl/productos/detalle/estados';

  constructor(private httpClient: HttpClient,
              private todoService: TodoService ) {
  }

  async createProductDetail(data) {
    const urlToCreate = this.url + 'new';
    const request = {
      url: urlToCreate,
      method: 'POST',
      content: data,
    };
    this.todoService.processRequest(request);
  }

  public getProductDetail(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<ProductDetail[]>(this.url + '?' + queryParam,
      {headers : headers});
  }


  public editProductDetail(data) {
    const idProductDetail = data.id;
    const urlEdit = this.url + idProductDetail + '/edit';
    const request = {
      url: urlEdit,
      method: 'PUT',
      content: data,
    };
    this.todoService.processRequest(request);
  }
  public getProductDetailStates() {
    return this.httpClient.get<State[]>(this.urlProductDetailStates,     {headers : headers});
  }
}
