import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  clickMenu$: Observable<any>;
  private clickMenuSubject = new Subject<any>();

  constructor() {
    this.clickMenu$ = this.clickMenuSubject.asObservable();
  }

  clicMenu(data) {
    this.clickMenuSubject.next(data);
  }
}
