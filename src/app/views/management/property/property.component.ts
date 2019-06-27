import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "ag-grid-enterprise";
import {OperationsService} from "../../../services/operations/operations.service";
import {Item} from "../../../models/item";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {MenuItem, SelectItem} from "primeng/api";
import {Default} from "../../../models/default";
import {InventorReturn} from "../../../models/inventorReturn";
import {ValidatorService} from "../../../services/validator/validator.service";
import * as moment from 'moment';
import {InventorTransfer} from "../../../models/inventorTransfer";

interface Data {
  TotalCount: number
  data: Item[]
  status: number
  success: boolean
  totalCount: number
}
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
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
  brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];
  filteredBrands: any[];
  inventoryToBuildingDialogShow: boolean = false;
  cartDialogShow: boolean = false;
  personDialogShow: boolean = false;
  distributed: boolean = true;
  cartItemsData: Array<any> = [];
  selectedTabId: number = 12;
  cartItems: Array<any>=[];
  stockList: Array<Default> = [];
  formErrors: Array<string> = [];

  inventorReturnModel: InventorReturn = {
    inventarReturnGenerator: false,
    date: new Date()
  };
  propertyData: Array<any> = [];
  staffList: Array<any> = [];
  inventorTransfer: InventorTransfer ={
    date: new Date(),
    selectedIndex:0,
    generator: false,
    roomId: 89
  };

  constructor(private http: HttpClient, private operation: OperationsService, private validator: ValidatorService) {
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
            const dateAsString = cellValue;
            if (dateAsString == null) return 0;
            const dateParts = dateAsString.split("/");
            const day = Number(dateParts[2]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[0]);
            const cellDate = new Date(day, month, year);
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
      cardCellRenderer: function(params) {
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
          this.onGridReady(this.eventData)
        }
      })
      .catch()
  }
  inCart(inCard){
    alert(inCard);
  }
  filterBrands(event) {
    this.filteredBrands = [];
    for(let i = 0; i < this.brands.length; i++) {
      let brand = this.brands[i];
      if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBrands.push(brand);
      }
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
            }, 100);
          }
        };
        params.api.setDatasource(dataSource);
      })
      .catch(()=>alert("ერრორ"));

    /* this.http
       .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
       .subscribe((data: Array<any>) => {
         data.forEach(function(data, index) {
           data.id = "R" + (index + 1);
         });
         var dataSource = {
           rowCount: null,
           getRows: function(params) {
             console.log("asking for " + params.startRow + " to " + params.endRow);
             setTimeout(function() {
               var dataAfterSortingAndFiltering = sortAndFilter(data, params.sortModel, params.filterModel);
               var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
               var lastRow = -1;
               if (dataAfterSortingAndFiltering.length <= params.endRow) {
                 lastRow = dataAfterSortingAndFiltering.length;
               }
               params.successCallback(rowsThisPage, lastRow);
             }, 100);
           }
         };
         params.api.setDatasource(dataSource);
       });
 */
  }
  ngOnInit(): void {
    this.items = [
      {label: 'განაწილებული', icon: 'fa fa-fw fa-bar-chart', command: (event) => {
          this.clickTabMenu(0)
        }},
      {label: 'გასანაწილებელი', icon: 'fa fa-fw fa-calendar', command: (event) => {
             this.clickTabMenu(1)
        }},
    ];

  }
  inventoryToBuildingDialog(){
    this.inventoryToBuildingDialogShow = true;
    this.inventorTransfer ={
      date: new Date(),
      selectedIndex:0,
      generator: false,
      roomId: 89
    };
  }
  showDialog() {
    this.inventorReturnModel = {
      inventarReturnGenerator: false,
      date: new Date()
    };
    this.display = true;
  }
  personDialog(){
    this.personDialogShow = true;
  }

  clickTabMenu(index) {
     this.distributed = index == 0 ? true: false;
  }

  generateInventarReturn() {
    let filter = ['date','selectedSection','selectedProperty','selectedCarrier'];
    this.formErrors =this.validator.checkObject(this.inventorReturnModel,filter);
    console.log(this.formErrors)
    if(this.formErrors.length === 0) {
      this.operation.getAddonNumber()
        .then(response=>{
          if(response['status'] ===200){
            this.inventorReturnModel.trDate = moment(this.inventorReturnModel.date).format("DD-MM-YYYY");
            this.inventorReturnModel.addon = response["data"];
            this.inventorReturnModel.inventarReturnGenerator = true;
            this.inventorReturnModel.toStock = this.inventorReturnModel.selectedSection['id'];
            this.inventorReturnModel.toWhomStock = this.inventorReturnModel.selectedProperty['id'];
            this.inventorReturnModel.carrierPerson = this.inventorReturnModel.selectedCarrier["id"];

            this.inventorReturnModel.listData = this.cartItemsData;
            this.inventorReturnModel.list = this.cartItemsData.map(value => {
              return {itemId:value["id"],amount:value["amount"]}
            });

          }

        })
        .catch()
    }
  }

  activateInventarReturn() {
    let formData =  new FormData();
    for(let key in this.inventorReturnModel){
      if(key==='list' || key==='listData'){
        formData.append(key,JSON.stringify(this.inventorReturnModel[key]));
      }else{
        formData.append(key,this.inventorReturnModel[key].toString());
      }
    }

    this.operation.generateReturnInvetorInvoice(formData)
      .then(response=>{
        if(response['status'] ===200){
          this.display =false;
        }else{
          alert(response["error"])
        }
      })
      .catch(response=>{
        alert(response["error"])
      })
  }
  if_error(data: Array<string>, field: string){
    // console.log(data,field, data.indexOf(field));
    return data.indexOf(field) >-1;
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

  getTransferProperty() {
    let formData = new FormData();
    formData.append("stockId",this.inventorReturnModel.selectedSection.id.toString());
    this.operation.getPropertyByStock(formData)
      .then((response: {data:Array<any>})=>{
        this.propertyData=response.data;

      })
      .catch()
    ;
  }

  onTabChange($event: any) {
    this.inventorTransfer.selectedIndex = $event.index;
  }
  generaTeInventorTransfer() {
    let filter = ['date','selectedProperty','selectedPerson','selectedCarrier'];
    if(this.inventorTransfer.selectedIndex ===1){
      filter.push('selectedSection')
    }
    this.formErrors =this.validator.checkObject(this.inventorTransfer,filter);

    if(this.formErrors.length === 0){

      this.operation.getAddonNumber()
        .then(response=>{
          if(response['status'] ===200){
            this.inventorTransfer.addon = response["data"];
            this.inventorTransfer.generator = true;
            this.inventorTransfer.trDate = moment(this.inventorTransfer.date).format("DD-MM-YYYY");

            this.inventorTransfer.fromStock = 11;
            this.inventorTransfer.listData = this.cartItemsData;
            this.inventorTransfer.carrierPerson = this.inventorTransfer.selectedCarrier["id"];
            this.inventorTransfer.toWhomSection = this.inventorTransfer.selectedProperty["id"];
            this.inventorTransfer.requestPerson = this.inventorTransfer.selectedPerson["id"];
            this.inventorTransfer.list = this.cartItemsData.map(value => {
              return {itemId:value["id"],amount:value["amount"]}
            });
          }

        })
        .catch()
    }
  }
  activeInventorTransfer() {
    let formData =  new FormData();
    for(let key in this.inventorTransfer){
      if(key==='list' || key==='listData'){
        formData.append(key,JSON.stringify(this.inventorTransfer[key]));
      }else{
        formData.append(key,this.inventorTransfer[key]);
      }
    }

    this.operation.generateTransferToPerson(formData,'section')
      .then(response=>{
        if(response['status'] ===200){
          this.inventorTransfer ={
            date: new Date(),
            selectedIndex:0,
            generator: false
          };
          this.inventorTransfer.generator = false;
          this.inventoryToBuildingDialogShow=false;
        }else{
          alert(response["error"])
        }
      })
      .catch(response=>{
        alert(response["error"])
      })

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
