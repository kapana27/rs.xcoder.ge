import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LgService {
  changeLanguage$: Observable<any>;
  private changeLanguageSubject = new Subject<any>();

  constructor() {
    this.changeLanguage$ = this.changeLanguageSubject.asObservable();
  }

  changeLanguage(data) {
    console.log(data); // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.changeLanguageSubject.next(data);
  }
}
