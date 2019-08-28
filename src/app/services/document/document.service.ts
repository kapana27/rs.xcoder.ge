import { Injectable } from '@angular/core';
import {RequestService} from "../request.service";
import {Config} from "../../config/config";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private Request: RequestService) { }

  getItemCatalog(type, param){
      const params = "?"+((type==='itemCatalogByGroup')? "itemGroupId="+param: "name="+param);
       return this.Request.Post(Config.document.post[type]+params, {});
  }
}
