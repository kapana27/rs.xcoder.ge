import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  constructor() { }
  checkObject(obj: any, fields: Array<string>){
    const errors: Array<string> = [];
    if(fields.length > 0){
      for (let v in fields){
        if(obj[fields[v]]==null || obj[fields[v]]===undefined || obj[fields[v]]===''){
          errors.push(fields[v]);
        }
      }
      return errors;
    }
    return errors;

  }
}
