import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'ag-grid-enterprise';
import {OperationsService} from '../../../services/operations/operations.service';
import {Item} from '../../../models/item';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {ConfirmationService, MenuItem, SelectItem} from 'primeng/api';
import {Default} from '../../../models/default';
import {InventorReturn} from '../../../models/inventorReturn';
import {ValidatorService} from '../../../services/validator/validator.service';
import * as moment from 'moment';
import {InventorTransfer} from '../../../models/inventorTransfer';
import {ForPerson} from '../../../models/forPerson';
import {RequestService} from '../../../services/request.service';
import {CustomDateComponent} from '../../../components/custom-date/custom-date.component';
import {NgbDate, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
interface Data {
  TotalCount: number;
  data: Item[];
  status: number;
  success: boolean;
  totalCount: number;
}

function format(f) {
  return f.toString().length === 1 ? '0' + f : f;
}

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    return { day: 21, month: 10, year: 2010};
  }

  format(date: NgbDateStruct): string {
    return date ?
      `${(date.day) ? (format(date.day)) : ''}-${(date.month) ? format(date.month) : ''}-${date.year}` : '';
  }
}
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  providers: [ConfirmationService, {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]

})
export class PropertyComponent implements OnInit {
  private lastCode: any = 0;
  prod: any = '';
  public frameworkComponents;
  propertyList: Array<any> = [];
  constructor(private http: HttpClient, private operation: OperationsService, private validator: ValidatorService, private confirmationService: ConfirmationService, private Request: RequestService) {
    this.getCartItems();
    this.prod = this.Request.prod;
    this.inOut = 'out';
    this.gridOptions = {
      context: {
        thisComponent : this
      }
    };
    this.sections = [
      {label: 'აირჩიეთ სექცია', value: null},
      {label: 'სექცია1', value: {id: 1, name: 'სექცია1', code: 'NY'}},
      {label: 'სექცია2', value: {id: 1, name: 'სექცია2', code: 'NY'}}
    ];
    this.properties = [
      {label: 'აირჩიეთ ფროფერთი', value: null},
      {label: 'ფროფერთი1', value: {id: 1, name: 'ფროფერთი1', code: 'NY'}},
    ];
    this.columnDefs = [
      {
        headerName: '#',
        field: 'rowId',
        width: 50,
        cellRenderer: 'loadingCellRenderer',
        sortable: false,
        suppressMenu: false
      },
      {
        headerName: ' ',
        field: 'cartId',
        width: 50,
        cellRenderer: 'cardCellRenderer',
        sortable: false,
        suppressMenu: false,

      },
      /*{
        headerName: 'ID',
        width: 50,
        field: 'id',
        cellRenderer: 'loadingCellRenderer',
        sortable: false,
        suppressMenu: true
      },*/
      {
        headerName: 'თარიღი',
        field: 'trDate',
        width: 150,
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            const dateAsString = cellValue;
            if (dateAsString == null) { return 0; }
            const dateParts = dateAsString.split('/');
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
        headerName: 'დასახელება',
        field: 'name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['equals'],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: 'მარკა',
        field: 'maker.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'მოდელი',
        field: 'model.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ფასი',
        field: 'price',
        width: 90,
        filter: 'agNumberColumnFilter',
        filterParams: {
          filterOptions: ['equals', 'lessThan', 'greaterThan'],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: 'რაოდენობა',
        field: 'amount',
        width: 90,
        filter: 'agNumberColumnFilter',
        filterParams: {
          filterOptions: ['equals', 'lessThan', 'greaterThan'],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: 'განზ, ერთეული',
        field: 'measureUnit.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'შტრიხკოდი',
        field: 'barcode',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ქარხ.#',
        field: 'factoryNumber',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ჯგუფი',
        field: 'itemGroup.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ტიპი',
        field: 'itemType.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'სტატუსი',
        field: 'itemStatus.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'მიმწოდებელი',
        field: 'supplier.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ზედნადები',
        field: 'invoice',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ზედდებული',
        field: 'invoiceAddon',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ინსპ',
        field: 'inspectionNumber',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      }
    ];
    this.frameworkComponents = { agDateInput: CustomDateComponent };

    this.columnDefs1 = [
      {
        headerName: '#',
        field: 'rowId',
        width: 50,
        cellRenderer: 'loadingCellRenderer',
        sortable: false,
        suppressMenu: false
      },
      {
        headerName: ' ',
        field: 'cartId',
        width: 50,
        cellRenderer: 'cardCellRenderer',
        sortable: false,
        suppressMenu: false,

      },
      /*{
        headerName: 'ID',
        width: 50,
        field: 'id',
        cellRenderer: 'loadingCellRenderer',
        sortable: false,
        suppressMenu: true
      },*/
      {
        headerName: 'თარიღი',
        field: 'trDate',
        width: 150,
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            const dateAsString = cellValue;
            if (dateAsString == null) { return 0; }
            const dateParts = dateAsString.split('/');
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
        headerName: 'თანამშრომელი',
        field: 'staff.fullname',
        sortable: false,
        suppressMenu: false,
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['equals'],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: 'ქალაქი',
        field: 'section.city.name',
        sortable: false,
        suppressMenu: false,
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['equals'],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: 'შენობა',
        field: 'section.building.name',
        sortable: false,
        suppressMenu: false,
      },
      {
        headerName: 'დეპარტამენტი',
        field: 'section.department.name',
        sortable: false,
        suppressMenu: false
      },
      {
        headerName: 'სამმართველო',
        field: 'section.division.name',
        sortable: false,
        suppressMenu: false
      },
      {
        headerName: 'სექცია',
        field: 'section.section.name',
        sortable: false,
        suppressMenu: false
      },

      {
        headerName: 'დასახელება',
        field: 'name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {
          filterOptions: ['equals'],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: 'მარკა',
        field: 'maker.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'მოდელი',
        field: 'model.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ფასი',
        field: 'price',
        width: 90,
        filter: 'agNumberColumnFilter',
        filterParams: {
          filterOptions: ['equals', 'lessThan', 'greaterThan'],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: 'რაოდენობა',
        field: 'amount',
        width: 90,
        filter: 'agNumberColumnFilter',
        filterParams: {
          filterOptions: ['equals', 'lessThan', 'greaterThan'],
          suppressAndOrCondition: true
        }
      },
      {
        headerName: 'განზ, ერთეული',
        field: 'measureUnit.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'შტრიხკოდი',
        field: 'barcode',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ქარხ.#',
        field: 'factoryNumber',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ჯგუფი',
        field: 'itemGroup.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ტიპი',
        field: 'itemType.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'სტატუსი',
        field: 'itemStatus.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'მიმწოდებელი',
        field: 'supplier.name',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ზედნადები',
        field: 'invoice',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ზედდებული',
        field: 'invoiceAddon',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      },
      {
        headerName: 'ინსპ',
        field: 'inspectionNumber',
        width: 150,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        filterParams: {defaultOption: 'startsWith'}
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };
    this.getRowStyle = {
      'ag-red': function(params) {
        try {
          return params['data']['tmpAmount'] > 0;
        } catch (e) {}
      },
      'ag-gray': function(params) {
        try {
          return params['data']['tmpAmount'] === 0 && (params['data']['initialAmount'] !== params['data']['amount']);
        } catch (e) {}
      }
    };
    this.rowSelection = 'single';
    this.rowModelType = 'serverSide';
    this.paginationPageSize = 100;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 2;
    this.getRowNodeId = function (item) {
      return item.id;
    };
    this.components = {
      loadingCellRenderer: function (params) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return '<img src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/loading.gif" alt="">';
        }
      },
      cardCellRenderer: function (params) {
          try {
            if (params['data']['tmpAmount'] === params['data']['amount']) {
              return  '';
            }
          } catch (e) {}

        if (params['data'] !== undefined && params['data']['inCart']) {
          return ' <button pButton type="button" label="Secondary"  style="padding: 2px; height: 100%" class="ui-button-raised ui-button-secondary"><i class="pi pi-shopping-cart cursor"  style="font-size: 28px;color: #bd0000; margin-top: -4px;"></i></button>';
        } else {
          return '<button pButton type="button" label="Secondary" style="padding: 2px; height: 100%"  class="ui-button-raised ui-button-secondary"><i class="pi pi-shopping-cart cursor"  style="font-size: 28px; margin-top: -4px;"></i></button>';
        }
      }
    };
    this.operation.getStoks()
      .then(response => {
        this.stockList = (response['status'] === 200) ? response['data'] : [];
      })
      .catch();
  }
  eventData: any = null;
  public dataChecker = false;
  public gridApi;
  public gridColumnApi;
  faCartPlus = faCartPlus;
  public columnDefs: Array<any> = [];
  public columnDefs1: Array<any> = [];
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
  brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
  filteredBrands: any[];
  inventoryToBuildingDialogShow: boolean = false;
  cartDialogShow: boolean = false;
  personDialogShow: boolean = false;
  distributed: boolean = true;
  cartItemsData: Array<any> = [];
  selectedTabId: number = -1;
  cartItems: Array<any> = [];
  stockList: Array<Default> = [];
  roomsList: Array<Default> = [];
  formErrors: Array<string> = [];
  inOut: string = 'out';
  forPerson: ForPerson = {
    date: { year: (new Date().getFullYear()), month: (new Date().getMonth()+1), day: (new Date().getDate())},
    generator: false
  };
  inventorReturnModel: InventorReturn = {
    inventarReturnGenerator: false,
    date: { year: (new Date().getFullYear()), month: (new Date().getMonth()+1), day: (new Date().getDate())},
  };
  propertyData: Array<any> = [];
  staffList: Array<any> = [];
  inventorTransfer: InventorTransfer = {
    date: { year: (new Date().getFullYear()), month: (new Date().getMonth()+1), day: (new Date().getDate())},
    selectedIndex: 0,
    generator: false,
    roomId: 89
  };
  public getRowStyle;
  public gridOptions: {
    context?: any
  };
  private sectionFields: any;
  uploadFiles: Array<any> = [];
  public minDate: NgbDateStruct = { year: (new Date().getFullYear()), month: (new Date().getMonth()+1), day: (new Date().getDate())} ;
  filesDialog: boolean = false;
  dialogName: any =  'ელექტრონული ზედდებული №';
  static inCart(inCard) {
    alert(inCard);
  }
/*  getCartItemsData(){
    this.cartItemsData = [];
    this.getCartItems().then(response=>{
      for(let key in response['data']){
        this.cartItemsData.push(JSON.parse(response['data'][key]));
      }
      this.cartItemsData.map(value => {
        if(value['name'] ===undefined || value['name']===null){
          value['name'] = '';
        }
        return value;
      })
    });
  }*/
  uploadedFiles($event: any) {
    this.uploadFiles = $event;
  }
  cart($event: any) {
    try {

      const status = $event['data']['tmpAmount'] === 0 || $event['data']['tmpAmount'] !== $event['data']['amount'] ;
      const status2 = ($event['contextMenu'] === true && status === true);
      let  status3 = false;
      if ($event['colDef'] !== undefined) {
        status3 = ($event['colDef']['field'] === 'cartId' && status === true);
      }
      if ( status2 || status3) {
          this.cartItems.indexOf($event['data']['id'].toString());
          const formData = new FormData();
          formData.append('globalKey', this.selectedTabId.toString());
          formData.append('key', $event['data']['id']);
          formData.append('value', JSON.stringify($event['data']));

          if (this.cartItems.indexOf($event['data']['id'].toString()) === -1) {
            this.operation.putInCart(formData)
              .then(response => {
                if (response['status'] === 200) {
                  $event['data']['inCart'] = true;
                  this.gridApi.refreshCells({ force: true });
                  // this.onGridReady(this.eventData);
                  this.getCartItems();
                }
              }).catch();
          } else {
            this.operation.removeCartItem(formData)
              .then(response => {
                if (response['status'] === 200) {
                  $event['data']['inCart'] = false;
                  this.gridApi.refreshCells({ force: true });
                  // this.onGridReady(this.eventData);
                  this.getCartItems();
                }

              }).catch();
          }

        }

    } catch (e) {}
  }
  cartDialog() {
    this.getCartItems()
      .then(response => {
        if (response['status'] === 200) {
          this.cartItemsData = [];
          for (const key in response['data']) {
            this.cartItemsData.push(JSON.parse(response['data'][key]));
          }
          this.cartItemsData.map(value => {
            if (value['name'] === undefined || value['name'] === null) {
              value['name'] = '';
            }
            return value;
          });
        } else {
          this.error('შეცდომა', response['error']);
        }
        this.cartDialogShow = true;
      }).catch(response => {
      this.error('შეცდომა', response['error']);
    });
  }
  private getCartItems() {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('globalKey', this.selectedTabId.toString());
      this.operation.getCartItems(formData)
        .then(response => {
          this.cartItemsData = [];
          this.cartItems = [];
          if (response['status'] === 200) {
            for (const i in response['data']) {
              this.cartItemsData.push(JSON.parse(response['data'][i]));
              this.cartItems.push(i);
            }
            this.cartItemsData.map(value => {
              if (value['name'] === undefined || value['name'] === null) {
                value['name'] = '';
              }
              return value;
            });
            resolve(response);
          }
        })
        .catch();
    });
  }
  removeCartItem() {

    const formData = new FormData();
    formData.append('globalKey', this.selectedTabId.toString());

    this.operation.clearCart(formData)
      .then(response => {
        if (response['status'] === 200) {
          this.cartItemsData = [];
          this.cartItems = [];
          this.onGridReady(this.eventData);
        } else {
          this.error('შეცდომა', response['error']);
        }
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      });
  }
  filterBrands(event) {
    this.filteredBrands = [];
    for (let i = 0; i < this.brands.length; i++) {
      const brand = this.brands[i];
      if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBrands.push(brand);
      }
    }
  }
  onGridReady(params) {
    this.eventData = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const operation = this.operation;
    const cartItems = this.cartItems;
    const inOut = this.inOut;
    const datasource = {
      getRows(params) {
        const parameters = [];
        for (const f in params['request']['filterModel']) {
          const name = (f.split('.').length > 0) ? f.split('.')[0] : f;
          parameters.push({
            property: name,
            value: (params['request']['filterModel'][f]['filterType'] != undefined && params['request']['filterModel'][f]['filterType'] === 'date' ) ? params['request']['filterModel'][f]['dateFrom'] : params['request']['filterModel'][f]['filter'],
            operator: (params['request']['filterModel'][f]['filterType'] != undefined && params['request']['filterModel'][f]['filterType'] === 'date' )? '=':'like'
          });
        }
        operation.getAllData(inOut === 'v2' ? 'in' : inOut, params['request']['startRow'], params['request']['endRow'], encodeURIComponent(JSON.stringify(parameters)))
          .then(response => {
            console.log(cartItems);
            params.successCallback(response['data'].map((v, k) => {
              v['rowId'] = (params['request']['startRow'] + 1 + k );
              if (v['barcode'].toString().length <= v['barCodeType']['length']) {
                v.barcode = v['barCodeType']['value'] + new Array(v['barCodeType']['length'] - (v['barcode'].toString().length - 1)).join('0').slice((v['barCodeType']['length'] - (v['barcode'].toString().length - 1) || 2) * -1) + v['barcode'];
              }
              v['count'] = 1;
              v['cartId'] = v['id'];
              v['barcode'] = (v['spend'] === 1) ? '' : (v['barcode'].toString() === '0') ? '' : v['barcode'];
              v['inCart'] = (cartItems.indexOf(v['id'].toString()) > -1);

              return v;
            }), response['totalCount']);
          })
          .catch(error => {
            console.error(error);
            params.failCallback();
          });
      }
    };
    params.api.setServerSideDatasource(datasource);
  }
  getContextMenuItems(params) {
    return [
      'copy', 'copyWithHeaders', 'paste', 'separator',
      {
        name: 'ექსელში ექსპორტი .xlsx',
        action: function () {
          if (params.context.thisComponent.selectedTabId === -2) {
            window.open(params.context.thisComponent.prod + '/api/secured/Item/Section/In/Export'+localStorage.getItem("filter"), '_blank');
          } else {
            window.open(params.context.thisComponent.prod + '/api/secured/Item/Section/Out/Export'+localStorage.getItem("filter"), '_blank');
          }

        }
      },
      'separator',

      {
        name: 'განპიროვნება',
        action: function () {
          if (!params['node']['data']['inCart']) {
            params.context.thisComponent.cart({data: params['node']['data'], contextMenu: true});
          }
          params.context.thisComponent.personDialog();
        }
      },
      {
        name: 'ინვ. შებრუნება',
        action: function () {
          if (!params['node']['data']['inCart']) {
            params.context.thisComponent.cart({data: params['node']['data'], contextMenu: true});
          }
          params.context.thisComponent.showDialog();
        }
      },
      {
        name: 'ინვენტარის მოძრაობა შენობებს შორის',
        action: function () {
          if (!params['node']['data']['inCart']) {
            params.context.thisComponent.cart({data: params['node']['data'], contextMenu: true});
          }
          params.context.thisComponent.inventoryToBuildingDialog();
        }
      },
      'separator',

      {
        name: 'მონიშნულის გაუქმება',
        action: function () {
          params.context.thisComponent.gridOptions.api.deselectAll();
        }
      },
      'separator',

      {
        name: 'კალათაში ჩაყრილი ნივთები',
        action: function () {
          params.context.thisComponent.cartDialog();
        }
      },
      {
        name: 'კალათის გასუფთავება',
        action: function () {
          params.context.thisComponent.removeCartItem();
        }
      }
    ];
  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'გასანაწილებელი', icon: '', command: (event) => {
          this.selectedTabId = -1;
          this.getCartItems().then(() => {
            this.clickTabMenu(1);

          });
        }
      },
      {
        label: 'განაწილებული', icon: '', command: (event) => {
          this.selectedTabId = -2;
          this.getCartItems().then(() => {
            this.clickTabMenu(0);
          });
        }
      }/*,
      {
        label: 'განაწილებული v2', icon: '', command: (event) => {
          this.selectedTabId=-2;
          this.getCartItems().then(()=>{
            this.clickTabMenu(2)
          });
        }
      }*/
    ];

  }
  inventoryToBuildingDialog() {

    this.operation.getAddonNumber({type: 'Section/Transfer', subType: 'last'})
      .then(response => {
        if (response['status'] === 200) {
          this.lastCode = response['data']['Right'];
          this.uploadFiles = [];
          this.inventoryToBuildingDialogShow = true;
          this.inventorTransfer = {
            date: { year: (new Date().getFullYear()), month: (new Date().getMonth()+1), day: (new Date().getDate())},
            selectedIndex: 0,
            generator: false,
            roomId: 89

          };
          this.checkMinDate();
        }
      });


  }
  showDialog() {
    this.operation.getAddonNumber({type: 'Stock/Return', subType: 'last'})
      .then(response => {
        if (response['status'] === 200) {
          this.lastCode = response['data']['Right'];
          this.uploadFiles = [];
          this.inventorReturnModel = {
            inventarReturnGenerator: false,
            date: { year: (new Date().getFullYear()), month: (new Date().getMonth()+1), day: (new Date().getDate())},
          };
          this.display = true;
          this.checkMinDate();
        }
      });

  }
  personDialog() {
    this.operation.getAddonNumber({type: 'Person/Transfer', subType: 'last'})
      .then(response => {
        this.lastCode = response['data']['Right'];
        this.uploadFiles = [];
        this.personDialogShow = true;
        this.forPerson = {
          date: { year: (new Date().getFullYear()), month: (new Date().getMonth()+1), day: (new Date().getDate())},
          generator: false
        };
        this.checkMinDate();
      })
      .catch();

  }
  clickTabMenu(index) {
    switch (index) {
      case 0:
        this.inOut = 'in';
        break;
      case 1:
        this.inOut = 'out';
        break;
      case 2:
        this.inOut = 'v2';
        break;
    }
    // this.inOut = (index === 0)?'in':'out';
    this.distributed = index != 0;
    this.onGridReady(this.eventData);
  }
  generateInventarReturn() {
    const filter = ['date', 'selectedSection', 'selectedProperty', 'selectedCarrier'];
    this.formErrors = this.validator.checkObject(this.inventorReturnModel, filter);
    if (this.formErrors.length === 0 && this.dataChecker) {
      if (this.cartItemsData.length === 0) {
        alert('კალათა ცარიელია');
        return;
      }
      this.operation.getAddonNumber({type: 'Stock/Return'})
        .then(response => {
          if (response['status'] === 200) {
            this.cartItemsData = this.cartItemsData.map(value => {
              if (value['name'] === undefined || value['name'] === null) {
                value['name'] = '';
              }
              return value;
            });
            //this.inventorReturnModel.trDate = moment(this.inventorReturnModel.date).format('DD-MM-YYYY');
            this.inventorReturnModel.trDate = this.inventorReturnModel.date.day+"-"+this.inventorReturnModel.date.month+"-"+this.inventorReturnModel.date.year;
            //this.inventorTransfer.trDate =this.inventorTransfer.date.day+"-"+this.inventorTransfer.date.month+"-"+this.inventorTransfer.date.year; // moment().format('DD-MM-YYYY');
            this.inventorReturnModel.addon = response['data'];
            this.inventorReturnModel.inventarReturnGenerator = true;
            this.inventorReturnModel.toStock = this.inventorReturnModel.selectedSection['id'];
            this.inventorReturnModel.toWhomStock = this.inventorReturnModel.selectedProperty['id'];
            this.inventorReturnModel.carrierPerson = this.inventorReturnModel.selectedCarrier['id'];

            this.inventorReturnModel.listData = this.cartItemsData;
            this.inventorReturnModel.list = this.cartItemsData.map(value => {
              return {itemId: value['id'], amount: value['count'], list: this.notNull(value['fileList']) ? value['fileList'].toString() : ''};

            });
            this.inventorReturnModel.files = this.uploadFiles.map(value => value['id']).toString();

          } else {
            this.error('შეცდომა', response['error']);
          }

        })
        .catch(response => {
          this.error('შეცდომა', response['error']);
        });
    }
  }

  filterPropertyList($event: any) {
    console.log($event);
    this.operation.getPropertyList($event.query)
      .then((response: {data: Array<any>}) => {
        this.propertyList = (response['status'] === 200) ? response.data.map(v => {
          return {
            id: v['id'],
            name:  v['fullname'] + ' , ' + v['position']['name'] + ' ,' + v['department']['name'],
            fname: v['fullname'],
            position: v['position']['name'],
            department:  v['department']['name']
          };
        }) : [];
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      });

  }
  activateInventarReturn() {
    const formData = new FormData();
    for (const key in this.inventorReturnModel) {
      if (key === 'list' || key === 'listData') {
        formData.append(key, JSON.stringify(this.inventorReturnModel[key]));
      } else if (key === 'addon') {
        formData.append(key, this.inventorReturnModel[key]['Right']);
      } else {
        formData.append(key, this.inventorReturnModel[key].toString());
      }
    }

    this.operation.generateReturnInvetorInvoice(formData)
      .then(response => {
        if (response['status'] === 200) {
          this.display = false;
        } else {
          this.error('შეცდომა', response['error']);
        }
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      });
  }
  if_error(data: Array<string>, field: string) {
    // console.log(data,field, data.indexOf(field));
    return data.indexOf(field) > -1;
  }
  filterStaff($event: any) {
    this.operation.getStaffList($event.query)
      .then((response: { data: Array<any> }) => {
        this.staffList = (response['status'] === 200) ? response.data.map(v => {
          return {
            id: v['id'],
            name:  v['fullname'] + ' , ' + v['position']['name'] + ' ,' + v['department']['name'],
            fname: v['fullname'],
            position: v['position']['name'],
            department:  v['department']['name']
          };
        }) : [];
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      });

  }
  getTransferProperty() {
    const formData = new FormData();
    formData.append('stockId', this.inventorReturnModel.selectedSection.id.toString());
    this.operation.getPropertyByStock(formData)
      .then((response: { data: Array<any> }) => {
        this.propertyData = response.data;
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      })
    ;
  }
  onTabChange($event: any) {
    this.inventorTransfer.selectedIndex = $event.index;
  }
  checkMinDate() {
    if (this.cartItemsData.length > 0 ) {
      const date = this.cartItemsData.map(v => v['trDate']).sort((a, b) => {
        const aDate = a.split('-');
        const bDate = b.split('-');
        return (
          (new Date(moment(aDate[2] + '-' + aDate[1] + '-' + aDate[0]).format('YYYY-MM-DD'))).getTime()
          -
          (new Date(moment(bDate[2] + '-' + bDate[1] + '-' + bDate[0]).format('YYYY-MM-DD'))).getTime()
        );
      })[0].split('-');
      //this.minDate = new Date(moment(date[2] + '-' + date[1] + '-' + date[0]).format('YYYY-MM-DD'));
      this.minDate = new NgbDate(date[2], date[1],date[0]);

    }
  }
  generaTeInventorTransfer() {
    const filter = ['date', 'selectedProperty', 'selectedCarrier'];
    if (this.inventorTransfer.selectedIndex === 1) {
      filter.push('selectedSection');
      filter.push('selectedRequestPerson');
    }
    this.formErrors = this.validator.checkObject(this.inventorTransfer, filter);
    if (this.formErrors.length === 0 && this.dataChecker) {
      if (this.cartItemsData.length === 0) {
        alert('კალათა ცარიელია');
        return;
      }
      this.operation.getAddonNumber({type: 'Section/Transfer'})
        .then(response => {
          if (response['status'] === 200) {
            this.cartItemsData = this.cartItemsData.map(value => {
              if (value['name'] === undefined || value['name'] === null) {
                value['name'] = '';
              }
              return value;
            });
            this.inventorTransfer.list = this.cartItemsData.map(value => {
              return {itemId: value['id'], amount: value['count'], list: this.notNull(value['fileList']) ? value['fileList'].toString() : ''};
            });
            this.inventorTransfer.files = this.uploadFiles.map(value => value['id']).toString();

            this.inventorTransfer.addon = response['data'];
            this.inventorTransfer.generator = true;
            this.inventorTransfer.requestPerson = this.inventorTransfer.selectedRequestPerson['id'];
            this.inventorTransfer.fromStock = 11;
            this.inventorTransfer.listData = this.cartItemsData;
            this.inventorTransfer.carrierPerson = this.inventorTransfer.selectedCarrier['id'];
            this.inventorTransfer.toWhomSection = this.inventorTransfer.selectedProperty['id'];
            //this.inventorTransfer.trDate = moment(this.inventorTransfer.date).format('DD-MM-YYYY');
            this.inventorTransfer.trDate =this.inventorTransfer.date.day+"-"+this.inventorTransfer.date.month+"-"+this.inventorTransfer.date.year;
            this.inventorTransfer.receiverPerson = this.inventorTransfer.selectedPerson['id'];
          }

        })
        .catch(response => {

        });
    }
  }
  notNull(value) {
    return (value !== undefined && value !== null);
  }
  activeInventorTransfer() {
    const formData = new FormData();
    for (const key in this.inventorTransfer) {
      if (key === 'list' || key === 'listData') {
        formData.append(key, JSON.stringify(this.inventorTransfer[key]));
      } else if (key === 'addon') {
        formData.append(key, this.inventorTransfer[key]['Right']);
      } else {
        formData.append(key, this.inventorTransfer[key]);
      }
    }

    this.operation.generateTransferToPerson(formData, 'section')
      .then(response => {
        if (response['status'] === 200) {
          this.inventorTransfer = {
            date: { year: (new Date().getFullYear()), month: (new Date().getMonth()+1), day: (new Date().getDate())},
            selectedIndex: 0,
            generator: false
          };
          this.removeCartItem();
          this.inventorTransfer.generator = false;
          this.inventoryToBuildingDialogShow = false;
        } else {
          this.error('შეცდომა', response['error']);
        }
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      });

  }
  selectPerson($event: any) {
      this.operation.getRoomsByPerson($event['id'])
        .then(response => {
          if (response['status'] === 200) {
              this.roomsList = response['data'];
          } else {
            this.error('შეცდომა', response['error']);
          }
        })
        .catch(response => {
          this.error('შეცდომა', response['error']);
        });
  }
  generateForPersonInvoice() {
    const filter = ['date', 'selectedPerson', 'selectedRoom'];
    if (this.cartItemsData.length === 0) {
      alert('კალათა ცარიელია');
      return;
    }
    this.formErrors = this.validator.checkObject(this.forPerson, filter);
    if (this.formErrors.length === 0 && this.dataChecker) {
        this.operation.getAddonNumber({type: 'Person/Transfer'})
          .then(response => {
            if (response['status'] === 200) {
              this.cartItemsData = this.cartItemsData.map(value => {
                if (value['name'] === undefined || value['name'] === null) {
                  value['name'] = '';
                }
                return value;
              });
              this.forPerson.addon = response['data'];
              this.forPerson.generator = true;
              this.forPerson.trDate = this.forPerson.date.day+"-"+this.forPerson.date.month+"-"+this.forPerson.date.year;
              this.forPerson.receiverPerson = this.forPerson.selectedPerson['id'];
              this.forPerson.roomId = this.forPerson.selectedRoom['id'];
              this.forPerson.list = this.cartItemsData.map(value => {
                return {itemId: value['id'], amount: value['count'], list: this.notNull(value['fileList']) ? value['fileList'].toString() : ''};

              });
              this.forPerson.files = this.uploadFiles.map(value => value['id']).toString();
              this.forPerson.listData = this.cartItemsData;

            } else {
              this.error('შეცდომა', response['error']);
            }
          }).catch(response => {
            this.error('შეცდომა', response['error']);
        });
    }
  }
  activeForPersonTransferInvoice() {
    const formData = new FormData();
    for (const key in this.forPerson) {
      if (key === 'list' || key === 'listData') {
        formData.append(key, JSON.stringify(this.forPerson[key]));
      } else if (key === 'addon') {
        formData.append(key, this.forPerson[key]['Right']);
      } else {
        formData.append(key, this.forPerson[key]);
      }
    }

    this.operation.generateTransferToPerson(formData, 'person')
      .then(response => {
        if (response['status'] === 200) {
          this.forPerson = {
            date: { year: (new Date().getFullYear()), month: (new Date().getMonth()+1), day: (new Date().getDate())},
            generator: false
          };
          this.removeCartItem();

          this.personDialogShow = false;
        } else {
          this.error('შეცდომა', response['error']);
        }
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      });
  }
  checker($event) {
    this.dataChecker = $event['status'];
  }
  error(title, data) {
    this.confirmationService.confirm({
      message: data,
      header: title,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      }
    });
  }
}
function sortAndFilter(allOfTheData, sortModel, filterModel) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
}
function sortData(sortModel, data) {
  const sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  const resultOfSort = data.slice();
  resultOfSort.sort(function(a, b) {
    for (let k = 0; k < sortModel.length; k++) {
      const sortColModel = sortModel[k];
      const valueA = a[sortColModel.colId];
      const valueB = b[sortColModel.colId];
      if (valueA == valueB) {
        continue;
      }
      const sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
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
  const filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  const resultOfFilter = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (filterModel.name.name) {
      if (filterModel.name.name.values.indexOf(item.name.name.toString()) < 0) {
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
