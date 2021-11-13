import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Token} from '../__entities/user';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Cargo} from '../__entities/cargo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;
  constructor(private http: HttpClient,
              private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isAuthenticated() {
    let isAuth = true;
    if (localStorage.getItem('currentUser') === null) {
      isAuth = false;
    }
    return isAuth;
  }

  public getToken(): Token {
    return this.currentUserSubject.value;
  }

  public get currentUserRole(): Cargo {
    return {
      idCargo: 1,
      nombre: 'JEFE ALMACENERO',
      estado: 1,
    };
    // return  this.currentUserSubject.value.cargo;
  }
  public login(username, password) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(map(token => {
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify(token));
        }
        this.currentUserSubject.next(token);
        return token;
      }));
  }

  logout () {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
