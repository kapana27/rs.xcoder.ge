import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private Request: RequestService) { }

  getData(start, limit) {
     return new Promise((resolve) => {
       resolve([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
     });
  }
}
