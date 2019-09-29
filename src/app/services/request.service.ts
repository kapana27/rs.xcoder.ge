import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public prod: string = ' ';
  error$: Observable<any>;
  private errorSubject = new Subject<any>();
  constructor(private http: HttpClient) {
    this.error$ = this.errorSubject.asObservable();
  }
  Get(uri) {
    uri = this.prod + uri;
    return new Promise((resolve, reject) => {
      this.http.get(uri)
        .toPromise()
        .then(response => {

          if (response['status'] === 200) {
            resolve(response);
          } else {
            this.error(response);
          }
        })
        .catch(reason => {
          this.error(reason);
        });
    });
  }
  GetWitoutStatus(uri) {
    uri = this.prod + uri;
    return new Promise((resolve, reject) => {
      this.http.get(uri)
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(reason => {
          alert('დაფიქსირდა შეცდომა');
        });
    });
  }
  Post(uri, params = {}) {
    uri = this.prod + uri;
    return new Promise((resolve, reject) => {
      this.http.post(uri, params)
        .toPromise()
        .then(response => {
          if (response['status'] === 200) {
            resolve(response);
          } else {
            this.error(response);
          }
        })
        .catch(reason => {
          this.error(reason);
        });
    });
  }
  PostWitoutStatus(uri, params = {}) {
    uri = this.prod + uri;
    return new Promise((resolve, reject) => {
      this.http.post(uri, params)
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(reason => {
          resolve(reason);
        });
    });
  }
  error(data) {
    this.errorSubject.next(data);
  }
}
