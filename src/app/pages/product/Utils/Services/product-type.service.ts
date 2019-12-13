import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProductType} from '../../../../__entities/product-type';
import {environment} from '../../../../../environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {

  private url = environment.apiUrl + '/tbl/tipo/producto/';

  constructor(private httpClient: HttpClient) {
  }

  public getActiveProductTypes() {
    const params = {
      // estado: '1',
    };
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<ProductType[]>(this.url + '?' + queryParam,
      {headers: headers});
  }
}

