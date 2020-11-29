import {environment} from '../environments/environment';
// import { NgxSpinnerService } from "ngx-spinner";

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_SERVER = environment.apiUrl;
  API_SERVER_SECURED = environment.apiUrl + '/secured';

  constructor(
    private httpClient: HttpClient,
    // private spinner: NgxSpinnerService,
    // private toastrService: ToastrService
  ) { }

  getData(cParams = {}): Observable<any> {
    const params = this.getHttpParams(cParams);
    // this.toastrService.warning('');
    return this.httpClient
      .get(this.API_SERVER_SECURED + '/data', {params})
      .pipe(map((res: any) => this.extractData(res)));
  }

  getFilters(cParams = {}): Observable<any> {
    const params = this.getHttpParams(cParams);
    // this.toastrService.warning('');
    return this.httpClient
      .get(this.API_SERVER_SECURED + '/filters', {params})
      .pipe(map((res: any) => this.extractData(res)));
  }


  signOut(data): any {
    return this.httpClient.post(this.API_SERVER_SECURED + '/logout', data).pipe(
      map((res: any) => {
        return this.extractData(res);
      })
    );
  }


  // ===================  Generic Utils ===================

  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  private getHttpParams(cParams): HttpParams {
    let params = new HttpParams();
    Object.keys(cParams).forEach((k) => {
      params = params.set(k, cParams[k]);
    });
    return params;
  }
}
