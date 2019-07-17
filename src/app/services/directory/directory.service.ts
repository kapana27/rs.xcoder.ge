import { Injectable } from '@angular/core';
import {RequestService} from "../request.service";
import {Config} from "../../config/config";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private Request: RequestService) {
  }

  getStructuralUnit(){
      return this.Request.Get(Config.List.get.structuralUnits);
  }

  getList(type: any) {
    return this.Request.Get(Config.List.get.list+"?parent=0&type="+type+"&page=1&start=0&limit=100");
  }

  getStructuralUnitTree(){
    return this.Request.Get(Config.List.get.StructuralUnitTree);

  }

  getEmployees(id) {
    return this.Request.Get(Config.List.get.staffByDepartment+"?dep="+id+"&page=1&start=0&limit=1000");
  }

  getMeasureUnitTree(){
    return this.Request.Get(Config.List.get.measureUnitTree+"?node=root");
  }
  getStructuralUnitLevelGrid(str){
    return this.Request.Post(Config.List.get.StructuralUnitLevelGrid+str+"page=1&start=0&limit=1000")
  }

  postList(type,params){
    return this.Request.Post(Config.dictionary.post.list[type]+"?"+params,{});
  }
  deleteList(params){
    return this.Request.Post(Config.dictionary.post.delete+"?"+params,{});
  }
  postMainList(type,action, params){
    return this.Request.Post(Config.dictionary.post[type][action]+"?"+params,{});
  }
}
