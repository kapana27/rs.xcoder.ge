import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "ag-grid-enterprise";
import {OperationsService} from "../../../services/operations/operations.service";
import {Item} from "../../../models/item";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {MenuItem, SelectItem} from "primeng/api";
import {Inventor} from "../../../models/inventor";
import * as moment from 'moment';
import {Barcode} from "../../../models/barcode";
import {Inventory} from "../../../models/inventory";
import {TransferToSection} from "../../../models/transfer-to-section";

interface Default{
  id?: number,
  name?: string
  isDefault?: boolean
}
interface TreeNode{
  "id"?: string,
  "text"?: string,
  "expanded"?: boolean,
  "leaf"?: boolean,
  "selectable"?: number,
  "spend"?: number,
  "children"?: TreeNode[]
}
interface Data {
  TotalCount: number
  data: Item[]
  status: number
  success: boolean
  totalCount: number
}

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit{
  eventData: any =null;
  public gridApi;
  public gridColumnApi;
  faCartPlus=faCartPlus;
  public columnDefs;
  public defaultColDef;
  public rowSelection;
  public rowModelType;
  public paginationPageSize;
  public cacheOverflowSize;
  public maxConcurrentDatasourceRequests;
  public infiniteInitialRowCount;
  public maxBlocksInCache;
  public getRowNodeId;
  public components;
  public rowData: [];
  items: MenuItem[];
  activeItem: MenuItem;
  display: boolean = false;
  date: Date;
  sections: SelectItem[];
  properties: SelectItem[];
  filteredBrands: any[];
  inventoryToBuildingDialogShow: boolean = false;
  cartDialogShow: boolean = false;
  inventorDialogShow: boolean = false;
  filteredCountriesSingle: any[];
  itemTypes: Default[]=[];
  itemStatus: Default[]=[];
  barcodes: Barcode[]=[];
  lastBarCodes: Barcode[]=[];
  measureUnits: Default[]=[];
  selectedCity: Default;
  MeasureUnitDialogShow: boolean=false;
  filteredInventors: Item[] =[];
  ItemData: Default[]=[];
  newRecordDialogShow: boolean = false;
  newItem: {
    selected?: string
    value?: string
  } = {selected: null, value: null};
  selectedFile: any;
  itemGroupDialogShow: boolean  = false;
  ItemGroup: TreeNode[] = [];
  newInventor: Inventor = {
    date: new Date(),
    consumption: false
  };
  frustrate: boolean = false;
  errors:{
    barcode?: string,
    name?: string,
    measureUnit?: string,
    group?: string,
    inventarType?: string,
    price?: string,
  } = {};
  selectedTabId: number = 12;
  cartItems: Array<any>=[];
  cartItemsData: Array<any> = [];
  transferToSection: TransferToSection ={
    Datetime: new Date()
  };
  stockList: Array<Default> = [];
  propertyData: Array<any> = [];
  staffList: Array<any> = [];
  transferToSectionInvoiceGenerator: boolean = false;

  constructor(private http: HttpClient, private operation: OperationsService) {
    this.sections = [
      {label:'აირჩიეთ სექცია', value:null},
      {label:'სექცია1', value:{id:1, name: 'სექცია1', code: 'NY'}},
      {label:'სექცია2', value:{id:1, name: 'სექცია2', code: 'NY'}}
      ];
    this.properties = [
      {label:'აირჩიეთ ფროფერთი', value:null},
      {label:'ფროფერთი1', value:{id:1, name: 'ფროფერთი1', code: 'NY'}},
    ];
    this.columnDefs = [
      {
        headerName: "#",
        field:'rowId',
        width: 30,
        cellRenderer: "loadingCellRenderer",
        sortable: false,
        suppressMenu: false
      },
      {
        headerName: "",
        field:'cartId',
        width: 50,
        valueGetter: "cartId",
        cellRenderer: "cardCellRenderer",
        sortable: false,
        suppressMenu: false,

      },
      {
        headerName: "ID",
        width: 50,
        field:'id',
        cellRenderer: "loadingCellRenderer",
        sortable: false,
        suppressMenu: true
      },
      {
        headerName: "თარიღი",
        field: "entryDate",
        width: 150,
        filter: 'agDateColumnFilter',
        filterParams:{
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            var dateAsString = cellValue;
            if (dateAsString == null) return 0;
            var dateParts = dateAsString.split("/");
            var day = Number(dateParts[2]);
            var month = Number(dateParts[1]) - 1;
            var year = Number(dateParts[0]);
            var cellDate = new Date(day, month, year);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      },
      {
        headerName: "დასახელება",
        field: "name",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "მარკა",
        field: "maker.name",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "მოდელი",
        field: "model.name",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "ფასი",
        field: "price",
        width: 90,
        filter: "agNumberColumnFilter",
        filterParams: {
          filterOptions: ["equals", "lessThan", "greaterThan"],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: "რაოდენობა",
        field: "amount",
        width: 90,
        filter: "agNumberColumnFilter",
        filterParams: {
          filterOptions: ["equals", "lessThan", "greaterThan"],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: "განზ, ერთეული",
        field: "measureUnit.name",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "შტრიხკოდი",
        field: "barcode",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "ქარხ.#",
        field: "factoryNumber",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "ჯგუფი",
        field: "itemGroup.name",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "ტიპი",
        field: "itemType.name",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "სტატუსი",
        field: "itemStatus.name",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "მიმწოდებელი",
        field: "supplier.name",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "ზედნადები",
        field: "invoice",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "ზედდებული",
        field: "invoiceAddon",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      },
      {
        headerName: "ინსპ",
        field: "inspectionNumber",
        width: 150,
        suppressMenu: true,
        filter: "agTextColumnFilter",
        filterParams: { defaultOption: "startsWith" }
      }
    ];
    this.defaultColDef = {
      sortable: true,
      resizable: true
    };
    this.rowSelection = "single";
    this.rowModelType = "infinite";
    this.paginationPageSize = 100;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 2;
    this.getRowNodeId = function(item) {
      return item.id;
    };
    this.components = {
      loadingCellRenderer: function(params) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return '<img src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/loading.gif">';
        }
      },
      cardCellRenderer: function(params,test) {
        if(params["data"] !==undefined && params["data"]["inCart"]){
          return '<i class="pi pi-shopping-cart"  style="font-size: 3em;color: green;width: 20px; height: 20px; margin-top: -4px;"></i>';
        }else{
          return '<i class="pi pi-shopping-cart"  style="font-size: 3em;width: 20px; height: 20px; margin-top: -4px;"></i>';
        }
      }
    };
    this.getCartItems().then(value => {
          for(let key in value['data']){
               this.cartItemsData.push(JSON.parse(value['data'][key]));
          }
      });
    this.operation.getStoks()
      .then(response=>{
        this.stockList = (response['status']===200)?response["data"]: [];
      })
      .catch()
  }
  filterInventorsByName(event) {
    let query = event.query;
    if(query.length > 1){
      this.operation.itemFilterByName(query)
        .then((response:Data)=>{
          this.filteredInventors = response.data;
        })
        .catch()
    }
  }
  onGridReady(params) {
    this.eventData = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.operation.getData(1,30)
      .then((response: Data) => {
        //this.totalCount= response.TotalCount;
        //this.virtualItems = response.data;
        const data  = response.data.map((v,i)=>{
          v['rowId'] = i+1;
          if(v['barcode'].toString().length <= v['barCodeType']['length'] ){
              v.barcode = v['barCodeType']['value']+ new Array(v['barCodeType']['length']-(v['barcode'].toString().length-1)).join('0').slice((v['barCodeType']['length']-(v['barcode'].toString().length-1) || 2) * -1) + v['barcode'];
          }

          v['inCart']= (this.cartItems.indexOf(v['id'].toString())>-1)? true: false;
          return v;
        });

        const dataSource = {
          rowCount: null,
          getRows: function (params) {
            console.log("asking for " + params.startRow + " to " + params.endRow);
            setTimeout(function () {
              const dataAfterSortingAndFiltering = sortAndFilter(data, params.sortModel, params.filterModel);
              const rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
              let lastRow = -1;
              if (dataAfterSortingAndFiltering.length <= params.endRow) {
                lastRow = dataAfterSortingAndFiltering.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 10);
          }
        };
        params.api.setDatasource(dataSource);
      })
      .catch(()=>alert("ერრორ"));
  }
  cart($event: any) {
      if($event['colDef']['field'] ==='cartId'){
        this.cartItems.indexOf($event['data']["id"].toString());
        let formData = new FormData();
        formData.append("globalKey",this.selectedTabId.toString());
        formData.append("key",$event['data']["id"]);
        formData.append("value",JSON.stringify($event['data']));

        if(this.cartItems.indexOf($event['data']["id"].toString()) === -1){
          this.operation.putInCart(formData)
            .then(response=>{
              if(response['status'] === 200){
                $event["data"]['inCart']= true;
                  this.onGridReady(this.eventData);
                this.cartItemsData = [];
                this.getCartItems().then(response=>{
                  for(let key in response['data']){
                    this.cartItemsData.push(JSON.parse(response['data'][key]));
                  }

                });
              }
            }).catch();
        }else{
          this.operation.removeCartItem(formData)
            .then(response=>{
              if(response['status'] === 200){
                $event["data"]['inCart']= false;
                this.onGridReady(this.eventData);
                this.cartItemsData=[];
                this.getCartItems().then(response=>{
                  for(let key in response['data']){
                    this.cartItemsData.push(JSON.parse(response['data'][key]));
                  }
                });
              }
            }).catch();
        }
      }
 }
  ngOnInit(): void {
    this.items = [
      {
        label: 'საწყობი A', id:"12", icon: 'fa fa-fw fa-bar-chart', command: (event) => {
          this.selectedTabId = 12;
          this.onGridReady(this.eventData);
        }
       },
      {
        label: 'საწყობი B', id: "13",icon: 'fa fa-fw fa-calendar',  command: (event) => {
          this.selectedTabId = 13;
          this.onGridReady(this.eventData);

      }},
    ];
    this.activeItem = this.items[0];
  }
  inventoryToBuildingDialog(){
    this.inventoryToBuildingDialogShow = true;
  }
  showDialog() {
    this.display = true;
  }
  cartDialog(){
    this.getCartItems()
      .then(response=>{
        if(response['status']===200){
          this.cartItemsData = [];
            for (let key in response['data']){
                this.cartItemsData.push(JSON.parse(response['data'][key]));
            }
        }
        this.cartDialogShow = true;
      })
  }
  itemGroupDialog(){
    this.itemGroupDialogShow = true;
     this.operation.getItemGroup()
       .then((response: TreeNode)=>{
         //const treeNode: TreeNode[] = [];
        // treeNode.push(response);
         this.ItemGroup = parseTree(response.children );
       })
       .catch()

  }
  inventorDialog(){
    this.inventorDialogShow=true;
    this.operation.getItemTypes()
      .then(response=>{
        this.itemTypes = response['data'];
      }).catch();
    this.operation.getItemStatus()
      .then(response=>{
        this.itemStatus = response['data'];
      }).catch()
    this.operation.getListBarcodes()
      .then(response=>{
        this.barcodes = response['data'];
      }).catch()
    this.operation.getMeasureUnits()
      .then(response=>{
        this.measureUnits = response['data'];
        console.log(this.measureUnits)
      }).catch();
  }
  onTabChange($event: any) {
     console.log($event)
  }
  newRecordDialog(type){
      this.newItem.selected = type;
      this.newRecordDialogShow = true;
  }
  saveNewRecord() {
    if(this.newItem.value !== null ){
      if(this.newItem.selected === 'model'){
        const  newItem = "?name="+this.newItem.value+"&parent="+this.newInventor.selectedMaker.id;
        this.operation.saveNewItem(this.newItem, newItem)
          .then((response)=>{
            this.newRecordDialogShow =false;
            this.filterItemSingle({query: this.newItem.value},this.newItem.selected);
            this.newItem ={};

          })
          .catch()
      }else{
        const  newItem = "?name="+this.newItem.value;
        this.operation.saveNewItem(this.newItem, newItem)
          .then((response)=>{
            this.newRecordDialogShow =false;
            this.filterItemSingle({query: this.newItem.value},this.newItem.selected);
            this.newItem ={};

          })
          .catch()
      }
    }
  }
  filterItemSingle($event: any, type) {
    this.newItem.selected = type;
    this.newItem.value = $event.query;
    let query = "?query="+this.newItem.value;
    if(type==='model'){
        query=query+"&parent="+this.newInventor.selectedMaker.id;
    }
    this.operation.getItemData(this.newItem.selected,query )
      .then(response=>{
          this.ItemData = response['data'];
      })
      .catch();
  }
  nodeSelect($event: any) {
    this.itemGroupDialogShow=false;
    this.newInventor.itemGroup = $event.node.id;
    this.newInventor.itemGroupName=$event.node.label;
    this.newInventor.spend=$event.node['spend'];
    this.newInventor.consumption = ($event.node['spend']===1)? true: false;
  }
  nodeUnselect($event: any) {
      console.log($event);
  }
  saveNewInventor() {
    this.inventorDialogShow=true;
    this.newInventor.entryDate = moment(this.newInventor.date).format("DD-MM-YYYY");
    this.newInventor.name = (this.newInventor.fullname !== undefined)?this.newInventor.fullname['name']: null;
    this.newInventor.itemType = (this.newInventor.selectedItemType!==undefined)?this.newInventor.selectedItemType['id']: null;
    this.newInventor.maker = (this.newInventor.selectedMaker !==undefined)?this.newInventor.selectedMaker['id']: null;
    this.newInventor.supplier = (this.newInventor.selectedSupplier !==undefined)?this.newInventor.selectedSupplier['id']: null;
    this.newInventor.itemStatus = (this.newInventor.selectedItemStatus !== undefined)?this.newInventor.selectedItemStatus['id']: null ;
    this.newInventor.model = (this.newInventor.selectedModel !== undefined) ?this.newInventor.selectedModel['id'] : null;
    this.newInventor.measureUnit = (this.newInventor.selectedMeasureUnitName != undefined) ?this.newInventor.selectedMeasureUnitName['id']: null;
    let inventory: Inventory = {
      entryDate: this.newInventor.entryDate,
      name: this.newInventor.name,
      maker: this.newInventor.maker,
      model: this.newInventor.model,
      price: this.newInventor.price,
      barCodeType: this.newInventor.barCodeType,
      barCode: this.newInventor.barCode,
      amount: (this.newInventor.spend ==1 )? this.newInventor.packageAmount: 1,
      itemNumber: this.newInventor.itemNumber,
      factoryNumber: this.newInventor.factoryNumber,
      supplier: this.newInventor.supplier,
      invoice: this.newInventor.invoice,
      invoiceAddon: this.newInventor.invoiceAddon,
      measureUnitName: this.newInventor.selectedMeasureUnitName['name'],
      measureUnit: this.newInventor.measureUnit,
      itemType: this.newInventor.itemType,
      itemStatus: this.newInventor.itemStatus,
      inspectionNumber: this.newInventor.inspectionNumber,
      itemGroupName: this.newInventor.itemGroupName,
      itemGroup: this.newInventor.itemGroup,
      spend: this.newInventor.spend,
      note: this.newInventor.note,
      list: this.lastBarCodes.map(value => {
          return {
            barCode: (value.barCodeVisualValue===undefined)? null: value.barCodeVisualValue,
            serialNumber:value.factoryNumber,
            amount:(this.newInventor.spend ==1 )? this.newInventor.packageAmount: this.newInventor.amount
          }
      })
    };
    let formdata = new FormData();
    for(let key in inventory){

      if(inventory[key] !==null && inventory[key] !== undefined){
        if(key=='list'){
          formdata.append(key, JSON.stringify(inventory[key]).replace("null","").replace("undefined",""))
        }else{
          formdata.append(key, inventory[key]);
        }
      }

    }
    this.operation.saveInventory((formdata))
      .then(response=>{
         if(response['status']==200){
           this.newInventor = {
             date: new Date(),
             consumption: false
           };
           inventory={};
           this.frustrate = false;
           this.inventorDialogShow = false;
           this.onGridReady(this.eventData);
           alert("ოპერაცია წარმატებით დასრულდა");
         }else {
           console.log(response);
           alert(response['error'])
         }
      })
      .catch(reason => {
        alert(reason["error"]);
      })

  }
  getLastCode() {
    if(!this.newInventor.consumption){
      this.newInventor.barCodeType = this.newInventor.selectedBarcode['id'];
      this.operation.getLastCode(this.newInventor.barCodeType)
        .then(response => {
          this.newInventor.fullBarCode = response['data']['value'] + response['data']['barCodeVisualValue'];
        })
        .catch()
    }
  }
  frustrateInventor() {
    this.lastBarCodes=[];
    this.errors ={}
    this.newInventor.entryDate = moment(this.newInventor.date).format("DD-MM-YYYY");
    this.newInventor.name = (this.newInventor.fullname !== undefined)?this.newInventor.fullname['name']: null;
    this.newInventor.itemType = (this.newInventor.selectedItemType !=undefined)?this.newInventor.selectedItemType['id']: null;
    this.newInventor.maker = (this.newInventor.selectedMaker !==undefined)?this.newInventor.selectedMaker['id']: null;
    this.newInventor.supplier = (this.newInventor.selectedSupplier !==undefined)?this.newInventor.selectedSupplier['id']: null;
    this.newInventor.itemStatus = (this.newInventor.selectedItemStatus !== undefined)?this.newInventor.selectedItemStatus['id']: null ;
    this.newInventor.measureUnit = (this.newInventor.selectedMeasureUnitName != undefined) ?this.newInventor.selectedMeasureUnitName['id']: null;
    this.newInventor.measureUnitName = (this.newInventor.selectedMeasureUnitName != undefined) ?this.newInventor.selectedMeasureUnitName['name']: null;
    this.newInventor.model = (this.newInventor.selectedModel!== undefined) ?this.newInventor.selectedModel['id'] : null;

    this.errors ={
        barcode: (this.newInventor.barCodeType === undefined)? "test":"",
        name: (this.newInventor.name ===undefined || this.newInventor.name ==null)? "test":"",
        inventarType: (this.newInventor.selectedItemType ===undefined)? "test":"",
        price: (this.newInventor.price ===undefined)? "test":"",
        measureUnit: (this.newInventor.selectedMeasureUnitName === undefined)? "test": "",
        group: (this.newInventor.itemGroup === undefined)? "test": ""
    }

     if(this.newInventor.itemGroup !== undefined && this.newInventor.consumption ===false){
       const err = [];
       for(let key in this.errors){
         if(this.errors[key] ==='test'){
           err.push(1);
         }
       }
       if(err.length === 0){
         this.operation.getFreeCodes({
           barCodeType: this.newInventor.barCodeType,
           count: this.newInventor.amount,
           start: this.newInventor.barCode
         })
           .then((response: {
             TotalCount: number,
             status: number,
             success: boolean,
             totalCount: number,
             data: Barcode[]
           })=>{
             this.newInventor.amount = (this.newInventor.spend ==1 )? this.newInventor.packageAmount: 1;

             this.lastBarCodes = response.data.map(value => {
               value.fullBarcode = value.value+value.barCodeVisualValue;
               value.factoryNumber = this.newInventor.factoryNumber;
               return value;
             });
             this.frustrate = true;
           })
           .catch(reason => {
             alert(reason["error"]);
           })
       }

     }else{
      this.errors.barcode =(this.newInventor.consumption )? '': "test";
      const err = [];
       for(let key in this.errors){
          if(this.errors[key] ==='test'){
              err.push(1);
          }
       }
      if(err.length ===0){
        this.newInventor.amount = (this.newInventor.spend ==1 )? this.newInventor.packageAmount: 1;
        this.newInventor.barCodeType=null;
        this.newInventor.barCode=null;

        for(let i=0;i<this.newInventor.amount;i++){
          this.lastBarCodes.push({value:'', barCodeVisualValue:''});
          this.frustrate = true;
        }
      }
     }
  }
  selectedName() {
    this.newInventor.selectedMaker=this.newInventor.fullname['maker'];
    this.newInventor.selectedModel=this.newInventor.fullname['model'];
    this.newInventor.factoryNumber=this.newInventor.fullname['factoryNumber'];
    this.newInventor.selectedItemType=this.newInventor.fullname['itemType'];
    this.newInventor.selectedItemStatus=this.newInventor.fullname['itemStatus'];
    this.newInventor.selectedSupplier=this.newInventor.fullname['supplier'];
    this.newInventor.invoice = this.newInventor.fullname['invoice'];
    this.newInventor.inspectionNumber = this.newInventor.fullname['inspectionNumber'];
    this.newInventor.price = this.newInventor.fullname['price'];
    this.newInventor.invoiceAddon = this.newInventor.fullname['invoiceAddon'];
    this.newInventor.selectedBarcode = this.newInventor.fullname['barCodeType'];
    this.newInventor.selectedMeasureUnitName = this.newInventor.fullname['measureUnit'];
    this.newInventor.itemGroup = this.newInventor.fullname['itemGroup']['id'];
    this.newInventor.itemGroupName=this.newInventor.fullname['itemGroup']['name'];
    this.newInventor.spend=this.newInventor.fullname['itemGroup']['spend'];
    this.newInventor.consumption = (this.newInventor.spend===1)? true: false;
    this.filterItemSingle({query:""},'marker');


    console.log(this.newInventor)

  }
  private getCartItems() {
    return new Promise((resolve, reject) => {
      let formData= new FormData();
      formData.append("globalKey",this.selectedTabId.toString());
      this.operation.getCartItems(formData)
        .then(response=>{
          this.cartItems = [];
          if(response["status"]===200){
            for (let i in response['data']){
              this.cartItems.push(i);
            }
            resolve(response);
          }
        })
        .catch()
    })
  }
  removeCartItem() {

    let formData = new FormData()
    formData.append("globalKey", this.selectedTabId.toString());

      this.operation.clearCart(formData)
        .then(response=>{
              if(response['status']===200){
                  this.cartItemsData = [];
                  this.cartItems=[];
              }
        })
        .catch()
  }
  generaTeTransferToSection() {

    this.transferToSection.trDate = moment(this.transferToSection.Datetime).format("DD-MM-YYYY");
    this.transferToSection.carrierPerson = this.transferToSection.carrierPersonDetails["id"];
    this.transferToSection.toWhomStock = this.transferToSection.toWhomStockDetails["id"];
    this.transferToSection.listData = this.cartItemsData;
    this.transferToSection.fromStock = this.transferToSection.fromDetails['id'];
    this.transferToSection.list = this.cartItemsData.map(value => {
      return {itemId:value["id"],amount:value["amount"]}
    });
    this.operation.getAddonNumber()
      .then(response=>{
        if(response['status'] ===200){
          this.transferToSection.addon = response["data"];
          this.transferToSectionInvoiceGenerator = true;
        }

      })
      .catch()
  }
  getTransferProperty() {
    let formData = new FormData();
    this.transferToSection.toStock = this.transferToSection.fromDetails.id;
    formData.append("stockId",this.transferToSection.fromDetails.id.toString());
    this.operation.getPropertyByStock(formData)
      .then((response: {data:Array<any>})=>{
        this.propertyData=response.data;

      })
      .catch()
        ;
  }
  filterStaff($event: any) {
      console.log($event);
      this.operation.getStaffList($event.query)
        .then((response: {data:Array<any>})=>{
          this.staffList = (response['status']===200)?response.data.map(v=>{
            return {
              id: v['id'],
              name: v["fullname"]+" , "+v["position"]["name"]+" ,"+ v["department"]["name"],
              fname:  v["fullname"]
            }
          }): [];
        })
        .catch()

  }
  activeTransferToSection() {
      let formData =  new FormData();
      for(let key in this.transferToSection){
          if(key==='list' || key==='listData'){
              formData.append(key,JSON.stringify(this.transferToSection[key]));
          }else{
            formData.append(key,this.transferToSection[key].toString());
          }
      }

      this.operation.generaTeTransferToSection(formData)
        .then(response=>{
          if(response['status'] ===200){
            this.transferToSection = {};
            this.transferToSectionInvoiceGenerator = false;
            this.display =false;
          }else{
            alert(response["error"])
          }
        })
        .catch(response=>{
          alert(response["error"])
        })
  }
  filterBrands($event: any) {
  }
}
function sortAndFilter(allOfTheData, sortModel, filterModel) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
}
function sortData(sortModel, data) {
  var sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  var resultOfSort = data.slice();
  resultOfSort.sort(function(a, b) {
    for (var k = 0; k < sortModel.length; k++) {
      var sortColModel = sortModel[k];
      var valueA = a[sortColModel.colId];
      var valueB = b[sortColModel.colId];
      if (valueA == valueB) {
        continue;
      }
      var sortDirection = sortColModel.sort === "asc" ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    return 0;
  });
  return resultOfSort;
}
function filterData(filterModel, data) {

  var filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  var resultOfFilter = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i];

    console.log(filterModel);
    if (filterModel.name) {
      if (filterModel.name.values.indexOf(item.name.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.maker.name) {
      if (filterModel.maker.name.values.indexOf(item.maker.name.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.model.name) {
      if (filterModel.model.name.values.indexOf(item.model.name.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.price) {
      if (filterModel.price.values.indexOf(item.price.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.amount) {
      if (filterModel.amount.values.indexOf(item.amount.toString()) < 0) {
        continue;
      }
    }

    if (filterModel.measureUnit.name) {
      if (filterModel.measureUnit.name.values.indexOf(item.measureUnit.name.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.barcode) {
      if (filterModel.barcode.values.indexOf(item.barcode.toString()) < 0) {
        continue;
      }
    }
    resultOfFilter.push(item);
  }
  return resultOfFilter;
}
function ServerSideDatasource(server) {
  return {
    getRows(params) {
      setTimeout(function() {
        var response = server.getResponse(params.request);
        if (response.success) {
          params.successCallback(response.rows, response.lastRow);
        } else {
          params.failCallback();
        }
      }, 500);
    }
  };
}
function FakeServer(allData) {
  return {
    getResponse(request, params) {
      console.log(" sort model", params.sortModel, params.filterModel);
      console.log("asking for rows: " + request.startRow + " to " + request.endRow);
      var rowsThisPage = allData.slice(request.startRow, request.endRow);
      var lastRow = allData.length <= request.endRow ? allData.length : -1;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow
      };
    }
  };
}
function pad(n) {
  return (new Array(n).join('0').slice((n || 2) * -1) + this).toString();
}
function parseTree(data: TreeNode[]): Array<TreeNode> {
    data.forEach( (value,index) => {
      data[index]['label']=value.text;
      data[index]['key'] = value.id;

      if(value.children !== undefined && value.children.length>0){
         parseTree(value.children);
      }
    });
    return data;
}

