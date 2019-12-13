import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  canActivate() {
    return this.authService.isAuthenticated() === true ? this.authService.isAuthenticated() :
      this.router.navigate(['/auth']);
  }
}
