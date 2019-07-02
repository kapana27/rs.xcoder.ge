import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from "../../config/config";
import {RequestService} from "../request.service";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient, private Request: RequestService) {}
  getData(tab, index, length) {
     return this.Request.Get(Config.baseURI+Config.operations.property.get.list + '?stockId='+tab+'&page=1&start='+index+'&limit='+length );
  }
  getAllData(inOut,index, length) {
    return this.Request.Get(Config.baseURI+Config.operations.property.get[inOut] + '?page=1&start='+index+'&limit='+length );
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
    return  this.Request.GetWitoutStatus(Config.List.get.ItemGroup+"?node=root");
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

  generaTeTransferToSection(formData,type='invoice'){
    return this.Request.Post(Config.List.post[type], formData)
  }

  generateReturnInvetorInvoice(formData){
    return this.Request.Post(Config.List.post.return, formData)
  }
  generateTransferToPerson(formData,type){
    console.log(type);
    return this.Request.Post(Config.transfer.post[type],formData);
  }

  getRoomsByPerson(id){
    return this.Request.Post(Config.List.get.rooms+'?receiverPerson='+id);
  }

  editInvetor(formData){
    return this.Request.Post(Config.inventory.post.update,formData);
  }
}