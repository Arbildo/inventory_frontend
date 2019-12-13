import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product, ProductoEstado} from '../../../../__entities/product';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {TodoService} from '../../../../todo.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private url = environment.apiUrl + '/tbl/producto/';
  private productStateUrl = environment.apiUrl + '/tbl/producto/estados';

  constructor(private httpClient: HttpClient,
              private todoService: TodoService) {
  }

  async createProduct(data) {
    const request = {
      url: this.url + 'new',
      content: data,
      method: 'POST',
    };
    this.todoService.processRequest(request);
  }

  public getActiveProducts() {
    const params = {};
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<Product[]>(this.url + '?' + queryParam,
      {headers: headers});
  }

  public getProductBy(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<Product[]>(this.url + '?' + queryParam,
      {headers: headers});
  }

  async disableProduct(product: Product) {
    const idProducto = product.idProducto;
    const urlEdit = this.url + idProducto + '/disable';
    const body = {
      estado: 0,
    };
    this.httpClient.put(urlEdit, body, {headers: headers})
      .toPromise()
      .then(res => {
        console.log(console.log(res));
      });
  }

  public editProduct(data) {
    const idProducto = data.idProducto;
    const request = {
      url: this.url + idProducto + '/edit',
      content: data,
      method: 'PUT',
    };
    this.todoService.processRequest(request);

  }

  public getProductStateList() {
    return this.httpClient.get<ProductoEstado[]>(this.productStateUrl,
      {headers: headers});
  }
}


