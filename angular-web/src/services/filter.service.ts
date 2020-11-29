import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new Subject<any>();

  constructor() { }

  sendFilterChanges(obj): void {
    this.filterSubject.next(obj);
  }

  getFilterChanges(): Observable<any> {
    return this.filterSubject.asObservable();
  }
}
