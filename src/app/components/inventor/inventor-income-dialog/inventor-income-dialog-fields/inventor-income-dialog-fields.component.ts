import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Inventor} from "../../../../models/inventor";
import {Default} from "../../../../models/default";
import {Barcode} from "../../../../models/barcode";
import {OperationsService} from "../../../../services/operations/operations.service";
import {TreeNode} from "../../../../models/tree-node";
import {ConfirmationService} from "primeng/api";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateCustomParserFormatter} from "../../../../views/management/warehouse/warehouse.component";
import {Item} from "../../../../models/item";
declare var $: any;
interface Data {
  TotalCount: number;
  data: Item[];
  status: number;
  success: boolean;
  totalCount: number;
}
@Component({
  selector: 'app-inventor-income-dialog-fields',
  templateUrl: './inventor-income-dialog-fields.component.html',
  styleUrls: ['./inventor-income-dialog-fields.component.scss'],
  providers: [ConfirmationService, {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]

})
export class InventorIncomeDialogFieldsComponent implements OnInit {
  @Input() formErrors: Array<string> = [];
  @Input() newInventor: Inventor = {};
  @Output() onKeyUp = new EventEmitter();
  @Input() filteredInventorNames: Array<any> = [];
  public  ItemData: ItemData = {
    maker:[]
  } ;
  @Output() onSelectedInventorName = new EventEmitter();
  @Input() makerSuggestions: Array<any> = [];
  @Output() onFilterItem = new EventEmitter();
  @Output() onInventorData = new EventEmitter();
  @Input() BarCodes: Barcode[] = [];
  @Input() MeasureUnits: Default[] = [];
  itemGroupDialogShow: boolean  = false;
  ItemGroup: TreeNode[] = [];
  @Input() ItemTypes: Default[] = [];
  @Input() ItemStatus: Default[] = [];
  newItem: {
    selected?: string,
    type?: any,
    identification?: string,
    value?: string
  } = {selected: null, value: null};


  constructor(private operation: OperationsService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }
  if_error(data: Array<string>, field: string) {
    return data.indexOf(field) > -1;
  }
  onKeyUpName(event: any) {
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
  onSelectInventorName($event) {
    this.newInventor.fullname=$event['name'];
  }

  filterItemSingle($event: any, type: string) {

    this.newItem.selected = type;
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

  newRecordDialog(marker: string, selectedMaker: Default) {

  }


  onLastCode() {

  }

  itemGroupDialog() {
    this.itemGroupDialogShow = true;
    setTimeout(() => {
      console.log( $('#itemGroup .ui-dialog').css('top', '100px'));
    }, 50);
    this.operation.getItemGroup()
      .then((response) => {
        this.ItemGroup = response['data'];
      })
      .catch();
  }

  nodeSelect($event: any) {
    this.newInventor.itemGroup = $event.node['data']['id'];
    this.newInventor.itemGroupName = $event.node['data']['name'];
    this.newInventor.spend = $event.node['data']['spend'];
    this.newInventor.isCar = $event.node['data']['isCar'];
    // this.newInventor.amount = ($event.node['data']['isCar'] === 1) ? 1 : null;
    this.newInventor.consumption = ($event.node['data']['spend'] === 1) ? true : false;
    this.onInventorData.emit(this.newInventor);

  }

  nodeUnselect($event: any) {

    this.onInventorData.emit(this.newInventor);

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
}
