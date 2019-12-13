import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../__entities/user';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Cargo} from '../__entities/cargo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient,
              private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isAuthenticated() {
    let isAuth = true;
    if (localStorage.getItem('currentUser') === null) {
      isAuth = false;
    }
    return isAuth;
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserRole(): Cargo {
    return  this.currentUserSubject.value.cargo;
  }
  public login(correo, password) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { correo, password })
      .pipe(map(user => {
        user.authdata = window.btoa(correo + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout () {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
