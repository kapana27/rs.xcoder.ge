import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../config/config';
import {RequestService} from '../request.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient, private Request: RequestService) {}
  getData(tab, index, length, params) {
    localStorage.setItem("filter", '?stockId=' + tab +"&filter="+params );
     return this.Request.Get(Config.baseURI + Config.operations.property.get.list + '?stockId=' + tab + '&page=1&start=' + index + '&limit=' + length+"&filter="+params );
  }
  getAllData(inOut, index, length, params) {
    localStorage.setItem('filter',"?filter="+params );
    return this.Request.Get(Config.baseURI + Config.operations.property.get[inOut] + '?page=1&start=' + index + '&limit=' + length +'&filter='+params);
  }
  getItemTypes() {
    return this.Request.Get(Config.baseURI + Config.itemTypes.get.types);
  }
  getListBarcodes() {
    return this.Request.Get(Config.baseURI + Config.List.get.barcode);
  }
  getItemStatus() {
      return this.Request.Get(Config.baseURI + Config.itemStatus.get.types + '?page=1&start=0&limit=50');
  }
 getMeasureUnits() {
      return this.Request.Get(Config.baseURI + Config.List.get.MeasureUnit);
  }
  itemFilterByName(name) {
      return this.Request.Get(Config.baseURI + Config.List.get.itemFilterByName + '?str=' + name);
  }
  getItemData(type, value) {
      return this.Request.Get(Config.baseURI + Config.List.get[type] + value);
  }


  getItemGroup() {
    return  this.Request.GetWitoutStatus(Config.baseURI + Config.List.get.ItemGroup + '?node=root');
  }

  saveNewItem(newItem, params) {
        return this.Request.Post(Config.baseURI + Config.List.post[newItem.selected] + params, {});
  }

  getLastCode(barcodeType) {
      return this.Request.Post(Config.baseURI + Config.List.post.lastBarCode + '?barCodeType=' + barcodeType, {});
  }
  getFreeCodes(data, formData={}) {
    return this.Request.Post(Config.baseURI + Config.List.post.freeCodes + '?barCodeType=' + data['barCodeType'] + '&count=' + data['count'] + '&start=' + data['start'],formData);
  }

  saveInventory(formdata) {
    return this.Request.Post(Config.baseURI + Config.inventory.post.insert, formdata );
  }

  putInCart(data) {
    return this.Request.Post(Config.baseURI + Config.cart.post.put, data);
  }
  getCartItems(data) {
      return this.Request.Post(Config.baseURI + Config.cart.post.getAll, data);
  }

  removeCartItem(formData: FormData) {

    return this.Request.Post(Config.baseURI + Config.cart.post.remove, formData);
  }

  clearCart(formData) {
    return this.Request.Post(Config.baseURI + Config.cart.post.clear, formData);
  }

  getStoks() {
    return this.Request.Get(Config.baseURI + Config.List.get.stock);
  }

  getPropertyByStock(formData) {
    return this.Request.Post(Config.baseURI + Config.List.post.property, formData);
  }
  getStaffList(query: any) {
    return this.Request.Post(Config.baseURI + Config.List.post.staff + '?name=' + query, {});
  }
  getPropertyList(query: any) {
    return this.Request.Post(Config.baseURI + Config.List.post.properyList + '?name=' + query, {});
  }
  getAddonNumber(params: {type: string, subType?: string}) {

    return this.Request.Post(Config.baseURI + Config.List.post.addon + '?type=' + params.type + '&subType=' + params.subType, {});
  }
  getAddonNumberWithExcell(formdata) {
    return this.Request.Post(Config.baseURI + Config.List.post.addon , formdata);
  }

  generaTeTransferToSection(formData, type= 'invoice') {
    return this.Request.Post(Config.baseURI + Config.List.post[type], formData);
  }

  generateReturnInvetorInvoice(formData) {
    return this.Request.Post(Config.baseURI + Config.List.post.return, formData);
  }

  generateReturnInvetorInvoice1(formData) {
    return this.Request.Post(Config.baseURI + Config.List.post.invReturn, formData);
  }

  generateTransferToPerson(formData, type) {
    console.log(type);
    return this.Request.Post(Config.baseURI + Config.transfer.post[type], formData);
  }

  getRoomsByPerson(id) {
    return this.Request.Post(Config.List.get.rooms + '?receiverPerson=' + id);
  }

  editInvetor(formData) {
    return this.Request.Post(Config.inventory.post.update, formData);
  }
  editInvetorMultiple(formData) {
    return this.Request.Post(Config.inventory.post.multiUpdate, formData);
  }

  getAllAttachments(id) {
    return this.Request.Get(Config.List.get.attachments + '?id=' + id);
  }
  getAllChiefUsers(name){
    return  this.Request.Post(Config.document.get.chiefUsers+"?name="+name,{});
  }
  createDocuments(params) {
    let formData = new FormData()

    if(params){
      for(let  p in params){
        console.log(p);
        if(p === 'items' && params[p]){
          formData.append(p,JSON.stringify(params[p]))
        }else{
          formData.append(p,params[p])
        }
      }
    }
    return this.Request.Post(Config.document.post.create, formData)
  }

  getAllChiefUsersFinance($eventElement: any) {
    return  this.Request.Post(Config.document.get.financeUsers+"?name="+name,{});
  }

}
