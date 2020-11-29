import {AuthGuardService} from './../guards/auth-guard.service';
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private authGurardService: AuthGuardService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAppHeaders(request);
    if (this.authGurardService.getJwtToken()) {
      request = this.addToken(request, this.authGurardService.getJwtToken());
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }

  addToken(request, token): any {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        code: '4064689bc325e15f7dce4e82c603139a',
        version: '1.0.0.2',
        platform: 'android'
      }
    });
  }

  addAppHeaders(request): any {
    return request.clone({
      setHeaders: {
        code: '4064689bc325e15f7dce4e82c603139a',
        version: '1.0.0.2',
        platform: 'android'
      }
    });
  }
}
