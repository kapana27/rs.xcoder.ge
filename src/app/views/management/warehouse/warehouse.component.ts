import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "ag-grid-enterprise";
import {OperationsService} from "../../../services/operations/operations.service";
import {Item} from "../../../models/item";
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {ConfirmationService, MenuItem, SelectItem} from "primeng/api";
import {Inventor} from "../../../models/inventor";
import * as moment from 'moment';
import {Barcode} from "../../../models/barcode";
import {Inventory} from "../../../models/inventory";
import {TransferToSection} from "../../../models/transfer-to-section";
import {InventorTransfer} from "../../../models/inventorTransfer";
import {ValidatorService} from "../../../services/validator/validator.service";
import {TreeNode} from "../../../models/tree-node";

interface Default{
  id?: number,
  name?: string
  isDefault?: boolean
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
  styleUrls: ['./warehouse.component.scss'],
  providers: [ConfirmationService]

})
export class WarehouseComponent implements OnInit{
  public lang = 'ge';
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
  public searchBox: boolean = false;
  public gridOptions:{
    context?: any,
    rowSelection: string,
    getSelectedRows: string,
  };
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
  visualBarcodes: Array<{label: string, value: Barcode}> = [];
  lastBarCodes: Barcode[]=[];
  measureUnits: Default[]=[];
  selectedCity: Default;
  MeasureUnitDialogShow: boolean=false;
  filteredInventors: Item[] =[];
  ItemData: Default[]=[];
  newRecordDialogShow: boolean = false;
  newItem: {
    selected?: string,
    type?: any,
    identification?: string,
    value?: string
  } = {selected: null, value: null};
  selectedFile: any;
  itemGroupDialogShow: boolean  = false;
  ItemGroup: TreeNode[] = [];
  newInventor: Inventor = {
    date: new Date(),
    consumption: false,
    price:0,
    amount:0,
    fullname:{
      name:""
    }
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
  selectedTabId: number = 11;
  cartItems: Array<any>=[];
  cartItemsData: Array<any> = [];
  cartMultipleItemsData: Array<any> = [];
  transferToSection: TransferToSection ={
    Datetime: new Date()
  };
  inventorTransfer: InventorTransfer ={
    date: new Date(),
    selectedIndex:0,
    generator: false,
    roomId: 89
  };
  stockList: Array<Default> = [];
  propertyData: Array<any> = [];
  staffList: Array<any> = [];
  roomsList: Array<any> = [];
  transferToSectionInvoiceGenerator: boolean = false;
  formErrors: Array<string> = [];
  public getRowStyle;
  private dataChecker =false;
  tmpData: any ={};
  private inventorOperation: string = 'new';
  public minDate: Date = new Date();
  addon: {
    Left?: string,
    Right?: string
  };
  filesDialog: boolean = false;
  uploadFiles: Array<any> = [];
  constructor(private http: HttpClient, private operation: OperationsService, private validator: ValidatorService,  private confirmationService: ConfirmationService) {
    this.gridOptions = {
      context:{
        thisComponent : this,
      },
      rowSelection: 'single',
      getSelectedRows: 'getSelectedRows',
    };
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
        field: "trDate",
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

    this.getRowStyle={
      'ag-gray': function(params) {
        try {
          return params['data']["initialAmount"] !== params['data']["amount"];
        }catch (e) {}
      },
      "ag-red": function(params) {
        try {
          return params['data']["tmpAmount"] > 0
        }catch (e) {}
      }
    }
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
      cardCellRenderer: function(params) {
        try {
          if(params["data"]["tmpAmount"] === params["data"]["amount"]){
            return  '';
          }
        }catch (e) {}
        if (params["data"] !== undefined && params["data"]["inCart"]) {
          return ' <button pButton type="button" label="Secondary"  style="padding: 2px; height: 100%" class="ui-button-raised ui-button-secondary"><i class="pi pi-shopping-cart cursor"  style="font-size: 28px;color: #bd0000; margin-top: -4px;"></i></button>';
        } else {
          return '<button pButton type="button" label="Secondary" style="padding: 2px; height: 100%"  class="ui-button-raised ui-button-secondary"><i class="pi pi-shopping-cart cursor"  style="font-size: 28px; margin-top: -4px;"></i></button>';
        }
      }
    };

    this.operation.getStoks()
      .then(response=>{
        this.stockList = (response['status']===200)?response["data"]: [];
      })
      .catch()


  }

  filterInventorsByName(event) {
    let query = event['query'];
    if(query.length > 1){
      this.operation.itemFilterByName(query)
        .then((response:Data)=>{
          this.filteredInventors = response.data;
        })
        .catch()
    }
    return query;
  }
  getContextMenuItems(params){
    return [
      "copy", "copyWithHeaders", "paste", "separator", "export",
      {
        name: "რედაქტირება",
        action: function () {

          params.context.thisComponent.tmpData = params['node']['data'];
          params.context.thisComponent.inventorEditDialog();
        }
      },
      {
        name: "ინვენტარის გაცემა",
        action: function () {
          if(!params['node']['data']['inCart']){
            params.context.thisComponent.cart({data:params['node']['data'], contextMenu:true})
          }
          params.context.thisComponent.inventoryToBuildingDialog();
        }
      },
      {
        name: "ინვენტარის მოძრაობა სექციებს შორის",
        action: function () {
          if(!params['node']['data']['inCart']){
            params.context.thisComponent.cart({data:params['node']['data'], contextMenu:true})
          }
          params.context.thisComponent.showDialog();
        }
      }
    ];
  }
  onGridReady(params) {
    this.eventData = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.operation.getData(this.selectedTabId,0,1000)
      .then((response: Data) => {
        //this.totalCount= response.TotalCount;
        //this.virtualItems = response.data;
        const data  = response.data.map((v,i)=>{
          v['rowId'] = i+1;
          v['cartId'] = v['id'];
          if(v['barcode'].toString().length <= v['barCodeType']['length'] ){
              v.barcode = v['barCodeType']['value']+ new Array(v['barCodeType']['length']-(v['barcode'].toString().length-1)).join('0').slice((v['barCodeType']['length']-(v['barcode'].toString().length-1) || 2) * -1) + v['barcode'];
          }
          v['count']=1;
          v['barcode']=(v['spend']===1)?'':(v['barcode'].toString()==='0')?'':v['barcode'];
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
      .catch(response=>{
        this.error("შეცდომა",response['error'])
      });
  }
  cart($event: any) {
    try {
      const status = $event['data']['tmpAmount'] === 0 || $event['data']['tmpAmount'] !== $event['data']['amount'] ;
      const status2 = ($event['contextMenu']===true && status===true);
      let  status3=false;
      if($event['colDef'] !== undefined){
         status3=($event['colDef']['field'] ==='cartId' && status === true);
      }
      if( status2 || status3){
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
                this.gridApi.refreshCells({ force:true });
                //this.onGridReady(this.eventData);
                    this.getCartItems();
              }
            }).catch();
        }else{
          this.operation.removeCartItem(formData)
            .then(response=>{
              if(response['status'] === 200){
                $event["data"]['inCart']= false;
                this.gridApi.refreshCells({ force:true });
                //this.onGridReady(this.eventData);
                this.getCartItems();
              }

            }).catch();
        }
      }
    }catch (e) {}

 }
  ngOnInit(): void {
    this.getCartItems();
    this.items = [
      {
        label: 'A', id:"12", icon: 'fa fa-fw fa-home', command: (event) => {
          this.selectedTabId = 11;
          this.getCartItems();
          this.onGridReady(this.eventData);
        }
       },
      {
        label: 'B', id: "13",icon: 'fa fa-fw fa-home',  command: (event) => {
          this.selectedTabId = 12;
          this.getCartItems();
          this.onGridReady(this.eventData);

      }},
    ];
    this.activeItem = this.items[0];
  }
  inventoryToBuildingDialog(){
    this.uploadFiles = [];
    this.inventoryToBuildingDialogShow = true;
    this.inventorTransfer={
      date: new Date(),
      selectedIndex:0,
      generator: false,
      roomId: 89
    };
    this.checkMinDate();
  }
  checkMinDate(){
    if(this.cartItemsData.length >0 ){
      const date = this.cartItemsData.map(v=>v['trDate']).sort((a, b) => {
        const aDate = a.split("-");
        const bDate = b.split("-");
        return (
          (new Date(moment(aDate[2]+"-"+aDate[1]+"-"+aDate[0]).format("YYYY-MM-DD"))).getTime()
            -
          (new Date(moment(bDate[2]+"-"+bDate[1]+"-"+bDate[0]).format("YYYY-MM-DD"))).getTime()
        )
      })[0].split("-");
      this.minDate =new Date(moment(date[2]+"-"+date[1]+"-"+date[0]).format("YYYY-MM-DD"))
    }
  }
  showDialog() {
    this.uploadFiles = [];
    this.transferToSection ={
      Datetime: new Date()
    };
    this.display = true;
    this.checkMinDate();
    this.transferToSectionInvoiceGenerator = false;
  }
  cartDialog(){
    this.getCartItems()
      .then(response=>{
        this.cartDialogShow = true;
      })
  }
  itemGroupDialog(){
    console.log("group");
    this.itemGroupDialogShow = true;
     this.operation.getItemGroup()
       .then((response: TreeNode)=>{
         console.log("group1");

         console.log(response);
         this.ItemGroup = parseTree(response.children );
       })
       .catch()


  }
  inventorDialog(){
    this.inventorOperation='new';
    this.uploadFiles =[];
    this.inventorDialogShow=true;
    this.frustrate = false;
    this.newInventor={
      date: new Date(),
      consumption: false,
      fullname:{
        name:""
      },
      price:0,
      amount:0,
      selectedMeasureUnitName: { id: 3, name: 'ცალი'}
    };
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
        this.barcodes = response['data'].map(v=>{
          delete v.endPoint;
          return v
        });
      }).catch()
    this.operation.getMeasureUnits()
      .then(response=>{
        this.measureUnits = response['data'];
        console.log(this.measureUnits)
      }).catch();
  }
  inventorEditDialog(){


     this.inventorOperation=this.cartItemsData.length>1 ? 'multiple':'edit';

     console.log(this.cartItemsData, this.inventorOperation);
    if(Object.entries(this.tmpData).length >1 || this.inventorOperation ==='multiple'){
      this.inventorDialogShow=true;
      this.frustrate = false;
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
          this.barcodes = response['data'].map(v=>{
            delete v.endPoint;
            return v
          });
        }).catch()
      this.operation.getMeasureUnits()
        .then(response=>{
          this.measureUnits = response['data'].map(v=>{
            return {id: v['id'], name: v['name']}
          });
          console.log(this.measureUnits)
        }).catch();

       if(this.inventorOperation ==='edit'){
         const date = this.tmpData['trDate'].split("-");
         this.newInventor={
           id: this.tmpData.id,
           date: new Date(moment(date[2]+"-"+date[1]+"-"+date[0]).format("YYYY-MM-DD")) ,
           consumption: false,
           fullname: this.tmpData,
           price:this.tmpData.price,
           amount:this.tmpData.amount,
           entryDate: this.tmpData.entryDate,
           selectedBarcode: this.tmpData.barCodeType,
           barCode: this.tmpData.barcode.replace(this.tmpData.barCodeType['value'],""),
           fullBarCode:this.tmpData.barcode,
           inCart: this.tmpData.inCart,
           inStock: this.tmpData.inStock,
           inspectionNumber: this.tmpData.inspectionNumber,
           itemGroup: this.tmpData.itemGroup.id,
           itemGroupName: this.tmpData.itemGroup.name,
           selectedItemStatus: this.tmpData.itemStatus,
           itemStatus: this.tmpData.itemStatus.id,
           selectedItemType: this.tmpData.itemType,
           itemType: this.tmpData.itemType.id,
           selectedMaker: this.tmpData.maker,
           selectedMeasureUnitName: {id:this.tmpData.measureUnit['id'], name:this.tmpData.measureUnit['name']},
           measureUnit: this.tmpData.measureUnit.id,
           selectedModel: this.tmpData.model,
           name: this.tmpData.name,
           selectedSupplier: this.tmpData.supplier,
           tmpAmount: this.tmpData.tmpAmount,
           invoice:this.tmpData.invoice,
           invoiceAddon: this.tmpData.invoiceAddon,
           factoryNumber: this.tmpData['factoryNumber']
         };
       }
       else{
         this.cartMultipleItemsData = this.cartItemsData.map(tmpData =>{
           const date = tmpData['trDate'].substr(0,10).split("-");
           return {
             status: null,
             id: tmpData['id'],
             consumption: (tmpData['spend']==1),
             fullname: tmpData,
             price:tmpData['price'],
             amount:tmpData['amount'],
             entryDate: new Date(moment(date[2]+"-"+date[1]+"-"+date[0]).format("YYYY-MM-DD")),
             selectedBarcode: tmpData['barCodeType'],
             barCode: tmpData['barcode'].replace(tmpData['barCodeType']['value'],""),
             fullBarCode:tmpData['barcode'],
             inCart: true,
             inStock:tmpData['inStock'],
             inspectionNumber: tmpData.inspectionNumber,
             itemGroup: tmpData['itemGroup']['id'],
             itemGroupName: tmpData['itemGroup']['name'],
             selectedItemStatus: tmpData['itemStatus'],
             itemStatus: tmpData['itemStatus']['id'],
             selectedItemType: tmpData['itemType'],
             itemType: tmpData['itemType']['id'],
             selectedMaker: tmpData['maker'],
             selectedMeasureUnitName: {id:tmpData['measureUnit']['id'], name:tmpData['measureUnit']['name']},
             measureUnit: tmpData['measureUnit']['id'],
             selectedModel: tmpData['model'],
             name: tmpData['name'],
             selectedSupplier: tmpData['supplier'],
             tmpAmount: tmpData['tmpAmount'],
             invoice:tmpData['invoice'],
             invoiceAddon: tmpData['invoiceAddon'],
             factoryNumber: tmpData['factoryNumber']
           }
         } )
       }

    }

  }
  onTabChange($event: any) {
    this.inventorTransfer.selectedIndex = $event.index;
  }
  newRecordDialog(type,value){
      this.newItem.selected = type;
      this.newRecordDialogShow = true;
  }
  saveNewRecord() {
    const type = this.newItem.selected;
    if(this.newItem.value !== null ){
      if(this.newItem.selected === 'model'){
        const  newItem = "?name="+this.newItem.value+"&parent="+this.newInventor.selectedMaker['id'];
        this.operation.saveNewItem(this.newItem, newItem)
          .then((response)=>{
            this.newRecordDialogShow =false;
            this.filterItemSingle({query: this.newItem.value},this.newItem.selected);
            this.newItem ={};
            switch (type) {
              case 'model':
                  this.newInventor.selectedModel=response['data'];
                break;
              case 'marker':
                this.newInventor.selectedMaker=response['data'];
                break;
              case 'supplier':
                this.newInventor.selectedSupplier=response['data'];
                break;
              default: break;
            }

          })
          .catch(response=>{
            this.error("შეცდომა",response['error'])
          })
      }else{
        let  newItem = "?name="+this.newItem.value;
        newItem+=(this.newItem.identification !==null )? '&number='+this.newItem.identification: '';
        newItem+=(this.newItem.type !==null )? '&type='+this.newItem.type: '';
        this.operation.saveNewItem(this.newItem, newItem)
          .then((response)=>{
            this.newRecordDialogShow =false;
            this.filterItemSingle({query: this.newItem.value},this.newItem.selected);
            this.newItem ={};
            switch (type) {
              case 'model':
                this.newInventor.selectedModel=response['data'];
                break;
              case 'marker':
                this.newInventor.selectedMaker=response['data'];
                break;
              case 'supplier':
                this.newInventor.selectedSupplier=response['data'];
                break;
              default: break;
            }
          })
          .catch(response=>{
            this.error("შეცდომა",response['error'])
          })
      }
    }
  }
  filterItemSingle($event: any, type) {
    this.newItem.selected = type;
    let query ='';
    if(!isNaN(Number($event.query))){
      this.newItem.identification = $event.query;
      this.newItem.value = null;
       query = "?query="+this.newItem.identification;
    }else{
      this.newItem.identification = '';
      this.newItem.value = $event.query;
       query = "?query="+this.newItem.value;

    }

    if(type==='model'){
      if(this.newInventor.selectedMaker !== undefined){
        query=query+"&parent="+this.newInventor.selectedMaker['id'];
      }
    }
    this.operation.getItemData(this.newItem.selected,query )
      .then(response=>{
          this.ItemData = response['data'];
      })
      .catch(response=>{
        this.error("შეცდომა",response['error'])
      });
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
    this.newInventor.name =(typeof this.newInventor.fullname === 'string')?this.newInventor.fullname: this.newInventor.fullname['name'];
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
      amount: (this.newInventor.spend ==1 )? 1: this.newInventor.packageAmount,
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
            amount:this.newInventor.showAmount
          }
      }),
      files: this.uploadFiles.map(value => value["id"])
    };
    let formdata = new FormData();
    for(let key in inventory){
      console.log(inventory[key]);

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
             consumption: false,
             fullname:{
               name:""
             }
           };
           inventory={};
           this.frustrate = false;
           this.inventorDialogShow = false;
           this.onGridReady(this.eventData);
           alert("ოპერაცია წარმატებით დასრულდა");
         }else {
           this.error("შეცდომა",response['error'])
         }
      })
      .catch(response => {
        this.error("შეცდომა",response['error'])
      })

  }
  getLastCode() {
    console.log(this.newInventor);
    if(!this.newInventor.consumption){
      this.newInventor.barCodeType = this.newInventor.selectedBarcode['id'];
      this.newInventor.selectedItemType =  ["rsk1","rs1"].indexOf(this.newInventor.selectedBarcode['name'].toLocaleLowerCase())>-1 ? {id: 2, name: "მცირე ფასიანი"}: {id: 1, name: "ძირითადი საშუალებები"};
      this.operation.getLastCode(this.newInventor.barCodeType)
        .then(response => {
          this.newInventor.fullBarCode = response['data']['value'] + response['data']['barCodeVisualValue'];
        })
        .catch(response=>{
          this.error("შეცდომა",response['error'])
        })
    }
  }
  frustrateInventor() {
    this.lastBarCodes=[];
    this.errors ={}

    let filter = [
      'date',
      'amount',
      'selectedMeasureUnitName',
      'itemGroupName',
      'fullname',
      'selectedItemType',
      'price'
    ];

    if(this.newInventor.spend ===1){

    }else{
      filter.push( 'selectedBarcode');
    }
    this.formErrors =this.validator.checkObject(this.newInventor,filter);
    console.log(filter, this.newInventor, this.formErrors);

    if(this.formErrors.length === 0){
      this.newInventor.entryDate = moment(this.newInventor.date).format("DD-MM-YYYY");
      this.newInventor.name =(typeof this.newInventor.fullname === 'string')?this.newInventor.fullname: this.newInventor.fullname['name'];
      this.newInventor.itemType = (this.newInventor.selectedItemType !=undefined)?this.newInventor.selectedItemType['id']: null;

      this.newInventor.maker = (this.newInventor.selectedMaker !==undefined)?this.newInventor.selectedMaker['id']: null;
      this.newInventor.selectedMaker = (this.newInventor.selectedMaker !==undefined)? this.newInventor.selectedMaker: { id:null,name: ""};
      this.newInventor.selectedItemType = (this.newInventor.selectedItemType !==undefined)? this.newInventor.selectedItemType: { id:null,name: ""};
      this.newInventor.selectedItemStatus = (this.newInventor.selectedItemStatus !==undefined)? this.newInventor.selectedItemStatus: { id:null,name: ""};

      this.newInventor.supplier = (this.newInventor.selectedSupplier !==undefined)?this.newInventor.selectedSupplier['id']: null;
      this.newInventor.selectedSupplier = (this.newInventor.selectedSupplier !==undefined)?this.newInventor.selectedSupplier:  {id:null,name: ""};
      this.newInventor.itemStatus = (this.newInventor.selectedItemStatus !== undefined)?this.newInventor.selectedItemStatus['id']: null ;
      this.newInventor.measureUnit = (this.newInventor.selectedMeasureUnitName != undefined) ?this.newInventor.selectedMeasureUnitName['id']: null;
      this.newInventor.measureUnitName = (this.newInventor.selectedMeasureUnitName != undefined) ?this.newInventor.selectedMeasureUnitName['name']: null;
      this.newInventor.model = (this.newInventor.selectedModel!== undefined) ?this.newInventor.selectedModel['id'] : null;
      this.newInventor.selectedModel = (this.newInventor.selectedModel!== undefined) ? this.newInventor.selectedModel : { id:null,name: ""};
      this.operation.getAddonNumber({type:'Stock/Income'})
        .then(response=> {
          if (response['status'] === 200) {
              this.addon = response['data'];
            if(this.newInventor.itemGroup !== undefined && this.newInventor.consumption ===false){

              this.operation.getFreeCodes({
                barCodeType: this.newInventor.barCodeType,
                count: this.newInventor.amount,
                start: (this.newInventor.spend===0 && (this.newInventor.barCode !== undefined && this.newInventor.barCode !== null))?  this.newInventor.barCode : ''
              })
                .then((response: {
                  TotalCount: number,
                  status: number,
                  success: boolean,
                  totalCount: number,
                  data: Barcode[]
                })=>{
                  this.newInventor['showAmount'] = 1;
                  this.lastBarCodes = response.data.map(value => {
                    value.fullBarcode = value.value+value.barCodeVisualValue;
                    value.factoryNumber = this.newInventor.factoryNumber;
                    return value;
                  });
                  this.frustrate = true;
                })
                .catch(response => {
                  this.error("შეცდომა",response['error'])
                })


            } else{

              this.newInventor.barCodeType=null;
              this.newInventor.barCode=null;
              this.newInventor['showAmount'] = this.newInventor.amount;

              for(let i=0;i<1;i++){
                this.lastBarCodes.push({value:'', barCodeVisualValue:''});
                this.frustrate = true;
              }

            }

          }
        });

    }
  }
  selectedName() {
    console.log(this.newInventor)
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
    this.newInventor.selectedBarcode = this.newInventor.fullname['barCodeType']
    this.newInventor.barCodeType = this.newInventor.fullname['barCodeType']['id'];
    this.newInventor.barCode = '';
    this.newInventor.selectedMeasureUnitName = { id: this.newInventor.fullname['measureUnit']['id'], name: this.newInventor.fullname['measureUnit']['name']};
    this.newInventor.measureUnit = this.newInventor.fullname['measureUnit']['id'];
    this.newInventor.itemGroup = this.newInventor.fullname['itemGroup']['id'];
    this.newInventor.itemGroupName=this.newInventor.fullname['itemGroup']['name'];
    this.newInventor.spend=this.newInventor.fullname['itemGroup']['spend'];
    this.newInventor.consumption = (this.newInventor.spend === 1);
    this.filterItemSingle({query:""},'marker');
    this.getLastCode();
  }
  private getCartItems() {
    return new Promise((resolve, reject) => {
      let formData= new FormData();
      this.cartItemsData=[];
      formData.append("globalKey",this.selectedTabId.toString());
      this.operation.getCartItems(formData)
        .then(response=>{

          this.cartItems = [];
          if(response["status"]===200){
            for (let i in response['data']){
              this.cartItemsData.push(JSON.parse(response['data'][i]));
              this.cartItems.push(i);
            }
            this.cartItemsData.map(value => {
              if(value['name'] ===undefined || value['name']===null){
                value['name'] = '';
              }
              return value;
            })
            resolve(response);
          }
        })
        .catch()
    })
  }

  checker($event) {
    this.dataChecker=$event['status'];
    console.log($event);
  }
  removeCartItem() {

    let formData = new FormData()
    formData.append("globalKey", this.selectedTabId.toString());

      this.operation.clearCart(formData)
        .then(response=>{
              if(response['status']===200){
                  this.cartItemsData = [];
                  this.cartItems=[];
                 this.onGridReady(this.eventData)
              }else{
                this.error("შეცდომა",response['error'])
              }
        })
        .catch(response=>{
          this.error("შეცდომა",response['error'])
        })
  }
  generaTeTransferToSection() {
    let filter = ['Datetime','fromDetails','toWhomStockDetails','carrierPersonDetails'];
    this.formErrors =this.validator.checkObject(this.transferToSection,filter);

    if(this.formErrors.length === 0 && this.dataChecker){
      this.cartItemsData = this.cartItemsData.map(value => {
        if(value['name'] ===undefined || value['name']===null){
          value['name'] = '';
        }
        return value;
      });
      this.transferToSection.trDate = moment(this.transferToSection.Datetime).format("DD-MM-YYYY");
      this.transferToSection.carrierPerson = this.transferToSection.carrierPersonDetails["id"];
      this.transferToSection.toWhomStock = this.transferToSection.toWhomStockDetails["id"];
      this.transferToSection.listData = this.cartItemsData;
      this.transferToSection.fromStock = this.transferToSection.fromDetails['id'];
      this.transferToSection.list = this.cartItemsData.map(value => {
        return {itemId:value["id"],amount:value["count"]}
      });
      this.transferToSection.files=this.uploadFiles.map(value => value['id']).toString()
      this.operation.getAddonNumber({type:'Stock/Change'})
        .then(response=>{
          if(response['status'] ===200){
            this.transferToSection.addon = response["data"];
            this.transferToSectionInvoiceGenerator = true;
          }else{
            this.error("შეცდომა",response['error'])
          }

        })
        .catch(response=>{
          this.error("შეცდომა",response['error'])
        })
    }

  }
  getTransferProperty() {
    let formData = new FormData();
    this.transferToSection.toStock = this.transferToSection.fromDetails.id;
    formData.append("stockId",this.transferToSection.fromDetails.id.toString());
    this.operation.getPropertyByStock(formData)
      .then((response: {data:Array<any>})=>{
        this.propertyData=response.data;

      })
      .catch(response=>{
        this.error("შეცდომა",response['error'])
      })
        ;
  }
  filterStaff($event: any) {
      console.log($event);
      this.operation.getStaffList($event.query)
        .then((response: {data:Array<any>})=>{
          this.staffList = (response['status']===200)?response.data.map(v=>{
            return {
              id: v['id'],
              name:  v["fullname"] + " , " + v["position"]["name"] + " ," + v["department"]["name"],
              fname: v["fullname"],
              position: v["position"]["name"],
              department:  v["department"]["name"]
            }
          }): [];
        })
        .catch(response=>{
          this.error("შეცდომა",response['error'])
        })

  }
  activeTransferToSection() {
      let formData =  new FormData();
      for(let key in this.transferToSection){
          if(key==='list' || key==='listData'){
              formData.append(key,JSON.stringify(this.transferToSection[key]));
          }else if(key==='addon'){
            formData.append(key, this.transferToSection[key]['Right']);
          }else{
            formData.append(key,this.transferToSection[key].toString());
          }
      }

      this.operation.generaTeTransferToSection(formData,'stock')
        .then(response=>{
          if(response['status'] ===200){
            this.transferToSection = {};
            this.transferToSectionInvoiceGenerator = false;
            this.display =false;
            this.removeCartItem();
          }else{
            this.error("შეცდომა",response['error'])
          }
        })
        .catch(response=>{
          this.error("შეცდომა",response['error'])
        })
  }
  filterBrands($event: any) {
  }
  generaTeInventorTransfer() {
    let filter = ['date','selectedProperty','selectedPerson','selectedCarrier'];
    if(this.inventorTransfer.selectedIndex ===1){
       filter.push('selectedSection');
       filter.push('selectedRequestPerson')
    }
    this.formErrors =this.validator.checkObject(this.inventorTransfer,filter);

    if(this.formErrors.length === 0 && this.dataChecker){
      if(this.cartItemsData.length ===0){
        alert("კალათა ცარიელია");
        return;
      }
      this.operation.getAddonNumber({type:'Stock/Transfer'})
        .then(response=>{
          if(response['status'] ===200){
            this.addon = response['data'];

            this.cartItemsData = this.cartItemsData.map(value => {
              if(value['name'] ===undefined || value['name']===null){
                value['name'] = '';
              }
              return value;
            });
            this.inventorTransfer.addon = response["data"];
            this.inventorTransfer.generator = true;
            this.inventorTransfer.trDate = moment(this.inventorTransfer.date).format("DD-MM-YYYY");

            this.inventorTransfer.fromStock = 11;
            this.inventorTransfer.listData = this.cartItemsData;
            this.inventorTransfer.carrierPerson = this.inventorTransfer.selectedCarrier["id"];
            if(this.inventorTransfer.selectedIndex===1){
              this.inventorTransfer.receiverPerson  = this.inventorTransfer.selectedPerson["id"];
              this.inventorTransfer.requestPerson  = this.inventorTransfer.selectedRequestPerson["id"];
            }else{
              this.inventorTransfer.requestPerson = this.inventorTransfer.selectedPerson["id"];
            }
            this.inventorTransfer.toWhomSection = this.inventorTransfer.selectedProperty["id"];
            this.inventorTransfer.list = this.cartItemsData.map(value => {
              return {itemId:value["id"],amount:value["count"]}
            });
             this.inventorTransfer.files = this.uploadFiles.map(value => value["id"]).toString()
          }else{
            this.error("შეცდომა",response['error'])
          }
        })
        .catch(response=>{
          this.error("შეცდომა",response['error'])
        })
    }
  }
  activeInventorTransfer() {
    let formData =  new FormData();
    for(let key in this.inventorTransfer){
      if(key==='list' || key==='listData'){
        formData.append(key,JSON.stringify(this.inventorTransfer[key]));
      }else if(key==='addon') {
        formData.append(key,this.inventorTransfer[key]['Right']);
      }else{
        formData.append(key,this.inventorTransfer[key]);
      }
    }

    this.operation.generateTransferToPerson(formData, 'transfer')
      .then(response=>{
        if(response['status'] ===200){
          this.inventorTransfer ={
            date: new Date(),
            selectedIndex:0,
            generator: false
          };
          this.removeCartItem();
          this.inventorTransfer.generator = false;
          this.inventoryToBuildingDialogShow=false;
        }else{
          this.error("შეცდომა",response['error'])
        }
      })
      .catch(response=>{
        this.error("შეცდომა",response.error)
      })

  }
  if_error(data: Array<string>, field: string){
   // console.log(data,field, data.indexOf(field));
    return data.indexOf(field) >-1;
  }
  selectPerson($event: any) {
    this.inventorTransfer.toWhomSection = $event['id'];
    this.operation.getRoomsByPerson($event['id'])
      .then(response => {
        if(response['status']===200){
          this.roomsList = response['data'];
        }else{
          this.error("შეცდომა",response['error'])
        }
      })
      .catch(response=>{
        this.error("შეცდომა",response['error'])
      })
  }
  error(title,data) {
    this.confirmationService.confirm({
      message:data,
      header: title,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      }
    });
  }

  selectCell($event: any) {

  }
  notNull(value){
    return (value !== undefined && value !== null);
  }
  editNewInventor() {
    if(this.inventorOperation ==='edit'){
      let formdata = new FormData();
      for(let key in this.newInventor){
        if(this.newInventor[key] !==null && this.newInventor[key] !== undefined){
          if(key=='list'){
            formdata.append(key, JSON.stringify(this.newInventor[key]).replace("null","").replace("undefined",""))
          }else{
            formdata.append(key, this.newInventor[key]);
          }
        }
      }
      this.operation.editInvetor((formdata))
        .then(response=>{
          if(response['status']==200){
            this.newInventor = {
              date: new Date(),
              consumption: false,
              fullname:{
                name: ""
              }
            };
            this.frustrate = false;
            this.inventorDialogShow = false;
            this.onGridReady(this.eventData);
            this.tmpData = this.newInventor;
            alert("ოპერაცია წარმატებით დასრულდა");
          }else {
            this.error("შეცდომა",response['error'])
          }
        })
        .catch(response => {
          this.error("შეცდომა",response['error'])
        })
    }else if(this.inventorOperation ==='multiple'){

      this.newInventor.entryDate = moment(this.newInventor.date).format("DD-MM-YYYY");
      this.newInventor.name =(typeof this.newInventor.fullname === 'string')?this.newInventor.fullname: this.newInventor.fullname['name'];
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
        amount: this.newInventor.amount,
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
        list: this.cartItemsData.map(v=>v.id)
      };
      let formdata = new FormData();
      for(let key in inventory){
        console.log(key,this.notNull(inventory[key]));
        if(key==='list' && this.notNull(inventory[key])){
          formdata.append(key,inventory[key].toString())
        }else if(this.notNull(inventory[key])){
          formdata.append(key,inventory[key])
        }
      }
      this.operation.editInvetorMultiple(formdata)
        .then(response=>{
          if(response['status']==200){
            this.inventorDialogShow = false;
            this.onGridReady(this.eventData);
            this.tmpData = this.newInventor;
            alert("ოპერაცია წარმატებით დასრულდა");
          }
        })
        .catch(response => {
          this.error("შეცდომა",response['error'])
        })

      /*this.cartMultipleItemsData.forEach((value, index)=>{
        let formdata = new FormData();
        for(let key in value){
          if(value[key] !==null && value[key] !== undefined){
            if(key=='list'){
              formdata.append(key, JSON.stringify(value[key]).replace("null","").replace("undefined",""))
            }else if(key==='entryDate'){
              formdata.append(key, moment(value[key]).format("MM-DD-YYYY"))
            }else{

              formdata.append(key, value[key]);
            }
          }
        }
        this.operation.editInvetor((formdata))
          .then(response=>{
            if(response['status']==200){
              this.cartMultipleItemsData[index]['status']=true;
            }else {
              this.cartMultipleItemsData[index]['status']=false;
            }
          })
          .catch(response => {
            this.cartMultipleItemsData[index]['status']=false;

          })
      })*/

    }
  }



  onKeyUp($event: any) {

    if(typeof $event ==="object"){
      return;
    }
    if(this.lang==='ge'){
      this.newInventor.fullname= {
        name: en2geo((typeof this.newInventor.fullname ==="string")?this.newInventor.fullname: this.newInventor.fullname['name']),
      }
    }else{
      this.newInventor.fullname= {
        name: (typeof this.newInventor.fullname ==="string")?this.newInventor.fullname: this.newInventor.fullname['name']
      }
      this.filterInventorsByName({query: ((typeof this.newInventor.fullname ==="string")?this.newInventor.fullname: this.newInventor.fullname['name'])});
    }

    if(this.lang==='ge'){
      setTimeout(()=>{
        this.filterInventorsByName({query: en2geo((typeof this.newInventor.fullname ==="string")?this.newInventor.fullname: this.newInventor.fullname['name'])});
      },20)
    }
  }

  onKeyUpSupplier($event: any) {
    if(this.lang==='ge'){
      this.newInventor.selectedSupplier={ id:this.newInventor.selectedSupplier['id'],name: this.newInventor.selectedSupplier['name'], generatedName: en2geo((typeof this.newInventor.selectedSupplier ==="string")?this.newInventor.selectedSupplier: this.newInventor.selectedSupplier['name']) };
    }else{
      this.newInventor.selectedSupplier={ id:this.newInventor.selectedSupplier['id'],name: this.newInventor.selectedSupplier['name'], generatedName: ((typeof this.newInventor.selectedSupplier ==="string")?this.newInventor.selectedSupplier: this.newInventor.selectedSupplier['name']) };
      this.filterItemSingle({query: ( this.newInventor.selectedSupplier['generatedName'])}, 'supplier')

    }
    if(this.lang==='ge'){
      setTimeout(()=>{
        this.filterItemSingle({query: en2geo( this.newInventor.selectedSupplier['generatedName'])}, 'supplier')
      },20)
    }
  }

  changeLang() {
    this.lang = (this.lang==='ge')? 'uk':'ge';
  }


  onRowClicked($event: any) {
    console.log($event);
    this.tmpData =$event['data'];
  }

  changeAddon($event: any) {
    console.log($event,this.transferToSection);
  }

  inventorSearch() {
    this.searchBox = true;
  }

  CloseInventorSearch() {
    this.searchBox = false;
  }


  uploadedFiles($event: any) {
      this.uploadFiles=$event;
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
function en2geo(data){
  console.log('input',data);
 try {
   let arr = data.split("") ||  data['name'].split("");
   let newArr = [];
   if(arr.length > 0) {
     const charList = "abcdefghijklmnopqrstuvwxyzCJLRSTWZ".split("");
     const geoList = 'აბცდეფგჰიჯკლმნოპქრსტუვწხყზჩჟ₾ღშთჭძ'.split("");
     arr.forEach(v => {
       let index = charList.indexOf(v);
       newArr.push((index > -1)?geoList[index]: v);
     });
   }
   console.log(newArr.length>0?newArr.join(""): arr.join(""));
   return newArr.length>0?newArr.join(""): arr.join("");
 }catch (e) {
 }
}
