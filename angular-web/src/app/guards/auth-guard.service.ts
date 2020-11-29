import {environment} from './../../environments/environment.prod';
import {Observable} from 'rxjs';
import {tap, mapTo, catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/internal/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private readonly JWT_TOKEN = 'token';

  constructor(private http: HttpClient) { }

  login(user): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, user)
      .pipe(
        tap(res => {
          if (res.data.pwd_force_change) {
            return of(res.data);
          } else {
            return this.doLoginUser(res.data);
          }
        }),
        // mapTo(true),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }

  doLoginUser(data): void {
    this.storeToken(data.token);
  }

  storeToken(token): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }


  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  logOut(): void {
    this.removeTokens();
  }

  removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
  }
}
