import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Client} from '../../__entities/client';
import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  private url = environment.apiUrl + '/tbl/cliente/';

  constructor(private httpClient: HttpClient) {
  }

  public getClientByDocument(documentNumber) {
    const consultUrl = this.url + 'doc/' + documentNumber;
    return this.httpClient.get<Client[]>(consultUrl, {headers: headers});
  }
  public getClientsBy(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<Client[]>(this.url + '?' + queryParam,
      {headers : headers});
  }

  async disableUser(client: Client) {
    const idCliente = client.idCliente;
    const urlEdit = this.url + idCliente + '/disable';
    const body = {
      estado : 3,
    };
        this.httpClient.put(urlEdit, body,  {headers : headers})
          .toPromise()
          .then(res => {console.log(console.log(res));
      });
  }

  public editProduct(client: Client) {
    const idCliente = client.idCliente;
    const urlEdit = this.url + idCliente + '/edit';
    this.httpClient.put(urlEdit, client,
      {headers : headers})
      .toPromise()
      .then(res => {console.log(console.log(res));
      });
  }
}
