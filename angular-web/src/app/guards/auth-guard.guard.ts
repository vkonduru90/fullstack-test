import {AuthGuardService} from './auth-guard.service';
import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthGuardService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return this.router.navigate(['/dashboard']);
    }
    // navigate to login page
    this.router.navigate(['/registration']);
    return !this.authService.isLoggedIn();
  }

}
