import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Estado, User} from '../../__entities/user';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Cargo} from '../../__entities/cargo';
import {TodoService} from '../../todo.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private url       = environment.apiUrl + '/tbl/usuario/';
  private urlStates = environment.apiUrl + '/tbl/usuario/estado';
  private urlCargo  = environment.apiUrl + '/tbl/cargo/';

  constructor(
    private httpClient: HttpClient,
    private todoService: TodoService) {

}

  public createUser(data) {
    const idUsuario = data.idUsuario;
    const request = {
      url: this.url + 'new',
      content: data,
      method: 'POST',
    };
    this.todoService.processRequest(request);
  }

  public getUserBy(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<User[]>(this.url + '?' + queryParam,
      {headers : headers});

  }
  public editUser(data) {
    const idUsuario = data.idUsuario;
    const request = {
      url: this.url + idUsuario + '/edit',
      content: data,
      method: 'PUT',
    };
    this.todoService.processRequest(request);
  }

  public getCharges(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<Cargo[]>(this.urlCargo + '?' + queryParam,
      {headers : headers});
  }

  public getUserStates(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<Estado[]>(this.urlStates + '?' + queryParam,
      {headers : headers});
  }
}
