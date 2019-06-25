import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from "../../config/config";
import {RequestService} from "../request.service";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient, private Request: RequestService) {}
  getData(index, length) {
     return this.Request.Get(Config.baseURI+Config.operations.property.get.data + '?page=1&start='+index+'&limit='+length );
  }
  getItemTypes(){
    return this.Request.Get(Config.itemTypes.get.types);
  }
  getListBarcodes(){
    return this.Request.Get(Config.List.get.barcode);
  }
  getItemStatus(){
      return this.Request.Get(Config.itemStatus.get.types+"?page=1&start=0&limit=50");
  }
 getMeasureUnits(){
      return this.Request.Get(Config.List.get.MeasureUnit);
  }
  itemFilterByName(name){
      return this.Request.Get(Config.List.get.itemFilterByName+'?str='+name);
  }
  getItemData(type,value){
      return this.Request.Get(Config.List.get[type]+ value);
  }


  getItemGroup(){
    return this.http.get(Config.List.get.ItemGroup+"?node=root").toPromise();
  }

  saveNewItem(newItem, params) {
        return this.Request.Post(Config.List.post[newItem.selected]+ params,{});
  }

  getLastCode(barcodeType){
      return this.Request.Post(Config.List.post.lastBarCode+"?barCodeType="+barcodeType,{});
  }
  getFreeCodes(data){
    return this.Request.Post(Config.List.post.freeCodes+"?barCodeType="+data['barCodeType']+"&count="+data['count']+"&start="+data['start'])
  }

  saveInventory(formdata){
    return this.Request.Post(Config.inventory.post.insert,formdata );
  }

  putInCart(data){
    return this.Request.Post(Config.cart.post.put,data);
  }
  getCartItems(data){
      return this.Request.Post(Config.cart.post.getAll, data);
  }

  removeCartItem(formData: FormData) {

    return this.Request.Post(Config.cart.post.remove, formData);
  }

  clearCart(formData) {
    return this.Request.Post(Config.cart.post.clear, formData);
  }

  getStoks(){
    return this.Request.Get(Config.List.get.stock);
  }

  getPropertyByStock(formData){
    return this.Request.Post(Config.List.post.property,formData)
  }
  getStaffList(query: any) {
    return this.Request.Post(Config.List.post.staff+"?name="+query, {});
  }
  getAddonNumber(){
    return this.Request.Post(Config.List.post.addon,{});
  }

  generaTeTransferToSection(formData){
    return this.Request.Post(Config.List.post.invoice, formData)
  }
}
