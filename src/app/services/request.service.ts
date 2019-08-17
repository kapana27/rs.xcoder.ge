import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public prod: string = '/rs';
  constructor(private http: HttpClient) {

  }
  Get(uri){
    uri = this.prod + uri;
    return new Promise((resolve, reject) => {
      this.http.get(uri)
        .toPromise()
        .then(response=>{
          resolve(response)
           /* if(response['status']===200){
                resolve(response)
            }*/
        })
        .catch(reason => {
          alert('დაფიქსირდა შეცდომა')
        })
    });
  }
  GetWitoutStatus(uri){
    uri = this.prod + uri;
    return new Promise((resolve, reject) => {
      this.http.get(uri)
        .toPromise()
        .then(response=>{
            resolve(response)
        })
        .catch(reason => {
          alert('დაფიქსირდა შეცდომა')
        })
    });
  }
  Post(uri,params ={}){
    uri = this.prod + uri;
    return new Promise((resolve, reject) => {
      this.http.post(uri,params)
        .toPromise()
        .then(response=>{
            resolve(response)
        })
        .catch(reason => {
          reject(reason)
        })
    })
  }
}
