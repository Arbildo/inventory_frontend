import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Lote, State} from '../../../../__entities/Lote';
import {environment} from '../../../../../environments/environment';
import {TodoService} from '../../../../todo.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  private url = environment.apiUrl + '/tbl/lote/';
  private urlLoteStates = environment.apiUrl + '/tbl/lote/estados';
  constructor(private httpClient: HttpClient,
              private todoService: TodoService) {
  }

  public getLotesBy(params) {
    const queryParam = new URLSearchParams(params).toString();
    return this.httpClient.get<Lote[]>(this.url + '?' + queryParam,
      {headers : headers});
  }

  async createLot(data) {
    const urlToCreate = this.url + 'new';
    const request = {
      url: urlToCreate,
      method: 'POST',
      content: data,
    };
    this.todoService.processRequest(request);
  }
  async updateLot(data) {
    const urlToEdit = this.url + data.idLote + '/edit';
    const request = {
      url: urlToEdit,
      method: 'PUT',
      content: data,
    };
    this.todoService.processRequest(request);
  }
  public getLoteStates() {
    return this.httpClient.get<State[]>(this.urlLoteStates, { headers : headers });
  }

}
