import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl("login");
      return false;
      //return an error to login page "session expired, please login again"
    }
    return true;
  }
}
