import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Inventor} from '../../../models/inventor';
import {Default} from '../../../models/default';
import {OperationsService} from '../../../services/operations/operations.service';
import {ConfirmationService} from 'primeng/api';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateCustomParserFormatter} from '../../../views/management/warehouse/warehouse.component';
import {Item} from '../../../models/item';
import {Barcode} from '../../../models/barcode';
import {RequestService} from "../../../services/request.service";
import {ValidatorService} from "../../../services/validator/validator.service";
declare var $: any;
interface Data {
  TotalCount: number;
  data: Item[];
  status: number;
  success: boolean;
  totalCount: number;
}
@Component({
  selector: 'app-inventor-income-dialog',
  templateUrl: './inventor-income-dialog.component.html',
  styleUrls: ['./inventor-income-dialog.component.scss'],
  providers: [ConfirmationService, {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]

})
export class InventorIncomeDialogComponent implements OnInit {
  @Input() header: any = '';
  @Input() dialog: boolean = false;
  addon: any = {};
  @Input() frustrate: boolean = false;
  @Output() onClose = new EventEmitter();
  public lastCode: number = 0;
  public inventorOperation: string = 'new';
  uploadFiles: Array<any> = [];
  formErrors: Array<string> = [];
  ItemData: ItemData = {};
  filesDialog: boolean = false;
  newInventor: Inventor = {
    date: { year: (new Date().getFullYear()), month: (new Date().getMonth() + 1), day: (new Date().getDate())},
    consumption: false,
    price: 0,
    amount: 0,
    fullname: {
      name: ''
    },
    data: [ ],
    comment: ''
  };
  newItem: {
    selected?: string,
    type?: any,
    identification?: string,
    value?: string
  } = {selected: null, value: null};
  filteredInventorNames: Array<Item> = [];
  barcodes: Barcode[] = [];
  measureUnits: Default[] = [];
  itemTypes: Default[] = [];
  itemStatus: Default[] = [];
  newInventorDialog: boolean = false;
  lastBarCodes: any;
  lastAddon: any;
  tableDialog: boolean = false;
  table: boolean = false;

  constructor(private operation: OperationsService, private confirmationService: ConfirmationService,private Request: RequestService, private validator: ValidatorService ) {

    this.lastAddon = 0;
    this.operation.getListBarcodes()
      .then(response => {
        this.barcodes = response['data'].map(v => {
          delete v.endPoint;
          return v;
        });
      }).catch();
    this.operation.getMeasureUnits()
      .then(response => {
        this.measureUnits = response['data'];
        console.log(this.measureUnits);
      }).catch();

    this.operation.getItemTypes()
      .then(response => {
        this.itemTypes = response['data'];
      }).catch();
    this.operation.getItemStatus()
      .then(response => {
        this.itemStatus = response['data'];
      }).catch();
  }

  ngOnInit() {
  }
  if_error(data: Array<string>, field: string) {
    // console.log(data,field, data.indexOf(field));
    return data.indexOf(field) > -1;
  }
  newRecordDialog(supplier: string, selectedSupplier: Default) {

  }
  getSupplier($event: any) {
       this.onFilterItem({query: $event.query, type: 'supplier'} );
  }

  notNull(value) {
    return (value !== undefined && value !== null);
  }
  error(title, data) {
    this.confirmationService.confirm({
      message: data,
      header: title,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      }
    });
    setTimeout(() => {
      $('.ui-confirmdialog').css({ 'z-index': 22222222});
    }, 200);
  }
  saveNewInventor() {
    this.newInventor.entryDate = this.newInventor.date.day + '-' + this.newInventor.date.month + '-' + this.newInventor.date.year;
    this.newInventor.supplier = (this.newInventor.selectedSupplier !== undefined) ? this.newInventor.selectedSupplier['id'] : null;
    const formdata = new FormData();
    for (const key in this.newInventor) {

      if (this.newInventor[key] !== null && this.newInventor[key] !== undefined) {
        if (key == 'list' || typeof this.newInventor[key] === 'object') {
          formdata.append(key, JSON.stringify(this.newInventor[key]).replace('null', '').replace('undefined', ''));
        } else {
          formdata.append(key, this.newInventor[key]);
        }
      }

    }
    this.operation.saveInventory((formdata))
      .then(response => {
        if (response['status'] == 200) {
          this.newInventor = {
            date: { year: (new Date().getFullYear()), month: (new Date().getMonth() + 1), day: (new Date().getDate())},
            consumption: false,
            price: 0,
            amount: 0,
            fullname: {
              name: ''
            },
            data: [ ]
          };
          this.onClose.emit('close');
          this.frustrate = false;
          alert('ოპერაცია წარმატებით დასრულდა');
        } else {
          this.error('შეცდომა', response['error']);
        }
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      });

  }

  editNewInventor() {

  }
  frustrateInventor() {

  }
  filterInventorsByName(event) {
    const query = event['query'];
    this.newInventor.fullname = event.query;
    if (query.length > 0) {
      this.operation.itemFilterByName(query)
        .then((response: Data) => {
          this.filteredInventorNames = response.data;
        })
        .catch();
    }
    return query;
  }

  onSelectedInventorName(event) {
    this.newInventor.fullname = event;
  }

  onFilterItem($event) {
    this.newItem.selected = $event['type'];
    let query = '';
    if (!isNaN(Number($event.query))) {
      this.newItem.identification = $event.query;
      this.newItem.value = null;
      query = '?query=' + this.newItem.identification;
    } else {
      this.newItem.identification = '';
      this.newItem.value = $event.query;
      query = '?query=' + this.newItem.value;

    }

    if ( this.newItem.selected === 'model') {
      if (this.notNull(this.newInventor.selectedMaker)) {
        query = query + '&parent=' + (this.notNull(this.newInventor.selectedMaker['id']) ? this.newInventor.selectedMaker['id'] : 0);
      }
    }
    this.operation.getItemData(this.newItem.selected, query )
      .then(response => {
        this.ItemData[this.newItem.selected] = response['data'];
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      });
  }



  onNewInventorData($event) {
    this.newInventor = $event;
  }

  addNewInventor() {
    this.newInventorDialog = true;
  }
  onCloseNewInventorDialog(event) {
      if (event === 'close') {
        this.newInventorDialog = false;
      }
  }
  newInventorData($event) {
      this.newInventor.data.push($event);
    console.log($event);
  }

  name(inventorElement: any) {
    if (this.notNull(inventorElement)) {
      return inventorElement;
    }
    return '';
  }

  onRemoveInventor(index, inventor) {
    let formData =  new FormData();
    formData.append("data", JSON.stringify(inventor));
    this.Request.Post("/api/secured/Item/PreInsert/Remove", formData)
      .then(response => {
        if(response['status']===200){
          this.newInventor.data.splice(index, 1);
        }
      })
      .catch(reason => {
        alert(reason['error'])
      });
  }

  lastBarCode(event: {barcode: Array<any>, addon: any}) {
    this.lastBarCodes = event.barcode[event.barcode.length - 1]['fullBarcode'];
    this.lastAddon = event['addon'];
    this.addon = event['addon'];
    this.newInventor.invoiceAddon=event['addon']['Right'];
  }

  closeTable() {
    this.table = false;
  }

  showTable() {
    console.log(this.newInventor);
    if (!this.table) {
      const filter = [
        'selectedSupplier'
      ];
      this.formErrors = this.validator.checkObject(this.newInventor, filter);
      if(this.formErrors.length===0 && this.newInventor.data.length>0){
        this.table = true;
      }
    } else {
        this.saveNewInventor();
    }
    // this.tableDialog=true
  }

  closeInventorIncomeDialog($event) {
    this.newInventorDialog = false;
  }

  closeDialog() {
    console.log('close')
    this.onClose.emit('close');
  }
}
