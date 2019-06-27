import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) { }
  Get(uri){
    return new Promise((resolve, reject) => {
      this.http.get(uri)
        .toPromise()
        .then(response=>{
            if(response['status']===200){
                resolve(response)
            }
        })
        .catch()
    });
  }
  Post(url,params ={}){
    return new Promise((resolve, reject) => {
      this.http.post(url,params)
        .toPromise()
        .then(response=>{
            resolve(response)
        })
        .catch()
    })
  }
}
