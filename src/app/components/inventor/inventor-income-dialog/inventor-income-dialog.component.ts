import {Component, Input, OnInit} from '@angular/core';
import {Inventor} from "../../../models/inventor";
import {Default} from "../../../models/default";
import {OperationsService} from "../../../services/operations/operations.service";
import {ConfirmationService} from "primeng/api";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateCustomParserFormatter} from "../../../views/management/warehouse/warehouse.component";
import {Item} from "../../../models/item";
import {Barcode} from "../../../models/barcode";
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
  @Input() header: any = "";
  @Input() dialog: boolean = false;
  @Input() addon: any = {};
  @Input() frustrate: boolean = false;
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
    data: [
      {
        date: { year: (new Date().getFullYear()), month: (new Date().getMonth() + 1), day: (new Date().getDate())},
        consumption: false,
        price: 0,
        amount: 0,
        fullname: {
          name: ''
        },
      }
    ]
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

  constructor(private operation: OperationsService, private confirmationService: ConfirmationService,) {
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
       this.onFilterItem({query: $event.query, type:'supplier'} );
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
    this.newInventor.fullname=event;
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
        console.log(this.ItemData)
      })
      .catch(response => {
        this.error('შეცდომა', response['error']);
      });
  }



  onNewInventorData($event) {
    this.newInventor = $event;
  }

  addNewInventor() {
    this.newInventor.data.push({
      date: { year: (new Date().getFullYear()), month: (new Date().getMonth() + 1), day: (new Date().getDate())},
      consumption: false,
      price: 0,
      amount: 0,
      fullname: {
        name: ''
      },
    })
  }
}
