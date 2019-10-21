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
import {moment} from "ngx-bootstrap/chronos/test/chain";
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
  @Input() newInventor: Inventor = {
    date: { year: (new Date().getFullYear()), month: (new Date().getMonth() + 1), day: (new Date().getDate())},
  };
  @Output() onKeyUp = new EventEmitter();
  @Input() filteredInventorNames: Array<any> = [];
  public  ItemData: ItemData = {
    maker:[]
  } ;
  @Output() onSelectedInventorName = new EventEmitter();
  @Input() makerSuggestions: Array<any> = [];
  @Output() onFilterItem = new EventEmitter();
  @Output() onInventorData = new EventEmitter();
  @Output() onCloseNewInventorDialog = new EventEmitter();
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
  @Input() header: any =" ";
  @Input() dialog: boolean = false;
  frustrate: boolean= false;
  @Output() lastBarCode=new EventEmitter();
  lastBarCodes: Array<any> = [];
  private addon: any;
  uploadedFiles: any[] = [];
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
  parseData(){
    console.log(this.newInventor.selectedMeasureUnit)
    if (typeof this.newInventor.fullname === "string") {
      this.newInventor.name = this.newInventor.fullname;
      this.newInventor.selectedModel = (this.notNull(this.newInventor.selectedModel)) ? ((typeof this.newInventor.selectedModel === 'object') ? this.newInventor.selectedModel : {
        id: '',
        name: this.newInventor.selectedModel
      }) : {id: '', name: ''};
      this.newInventor.selectedMeasureUnit = (this.notNull(this.newInventor.selectedMeasureUnit)) ?
        ((typeof this.newInventor.selectedMeasureUnit === "object") ? this.newInventor.selectedMeasureUnit : {
          id: '',
          name: this.newInventor.selectedMeasureUnit
        }) : {id: '', name: ''};

      this.newInventor.selectedMaker = (this.notNull(this.newInventor.selectedMaker)) ?
        ((typeof this.newInventor.selectedMaker === "object") ? this.newInventor.selectedMaker :
            {id: '', name: this.newInventor.selectedMaker}
        )
        : {id: '', name: ''};

      this.newInventor.selectedItemType = ((this.notNull(this.newInventor.selectedItemType)) ?
        ((typeof this.newInventor.selectedItemType === "object") ? this.newInventor.selectedItemType : {
          id: '',
          name: this.newInventor.selectedItemType
        })
        : {id: '', name: ''})
      this.newInventor.selectedItemStatus = ((this.notNull(this.newInventor.selectedItemStatus)) ?
        (typeof this.newInventor.selectedItemStatus === "object") ? this.newInventor.selectedItemStatus : {
          id: '',
          name: this.newInventor.selectedItemStatus
        }
        : {id: '', name: ''});
      this.newInventor.barCodeType = this.newInventor.selectedBarcode['id'];

    }
    else {
      this.newInventor.name = this.newInventor.fullname['name'];
      this.newInventor.selectedModel = (this.notNull(this.newInventor.fullname['model'])) ? this.newInventor.fullname['model'] : {name: ''};
      this.newInventor.selectedMeasureUnit = this.notNull(this.newInventor.fullname['measureUnit'])? { id: this.newInventor.fullname['measureUnit']['id'], name: this.newInventor.fullname['measureUnit']['name']}: {id:'',name: '' };
      this.newInventor.selectedMaker = this.notNull(this.newInventor.fullname['maker']) ?  this.newInventor.fullname['maker']: {name: ''} ;
      this.newInventor.selectedItemType = (this.notNull(this.newInventor.fullname['itemType']) && typeof this.newInventor.fullname['itemType'] === "object") ? this.newInventor.fullname['itemType'] : {name: this.newInventor.fullname['itemType']};
      this.newInventor.selectedItemStatus = (this.notNull( this.newInventor.fullname['itemStatus']) && typeof this.newInventor.fullname['itemStatus'] === "object")? this.newInventor.fullname['itemStatus']: {name:this.newInventor.fullname['itemStatus']} ;
      this.newInventor.barCodeType = this.newInventor.fullname['barCodeType']['id'];
    }
    this.newInventor.entryDate=this.newInventor.date.day + '-' + this.newInventor.date.month + '-' + this.newInventor.date.year

    console.log(this.newInventor)
  }
  addNewInventor() {

    if(this.notNull(this.newInventor.fullname)){
      this.parseData();
      console.log(this.newInventor)
      this.onInventorData.emit(this.newInventor);
      this.onCloseNewInventorDialog.emit('close');
    }

  }
  close() {
    this.onCloseNewInventorDialog.emit('close')
  }
  selectName($event: any) {

    if(typeof this.newInventor.fullname === "string"){
      this.newInventor.name = this.newInventor.fullname;
    }else{
      this.newInventor.name = this.newInventor.fullname['name'];
    }
    if(typeof this.newInventor.fullname['model'] === "string"){
      this.newInventor.selectedModel = {name: this.newInventor.fullname['model']}
    }else{
      this.newInventor.selectedModel = (this.notNull(this.newInventor.fullname['model']))? this.newInventor.fullname['model']: {name: ''};
    }
    if(typeof this.newInventor.fullname['measureUnit'] === "string"){
      this.newInventor.selectedMeasureUnit = { id: '', name: this.newInventor.fullname['measureUnit']};
    }else {
      this.newInventor.selectedMeasureUnit = { id: this.newInventor.fullname['measureUnit']['id'], name: this.newInventor.fullname['measureUnit']['name']};
    }
    if(typeof this.newInventor.fullname['maker'] === "string"){
      this.newInventor.selectedMaker = { id: '', name: this.newInventor.fullname['maker']};
    }else{
      this.newInventor.selectedMaker = this.notNull(this.newInventor.fullname['maker']) ?  this.newInventor.fullname['maker']: {name: ''} ;
    }


    this.newInventor.amount = this.newInventor.fullname['amount'];
    this.newInventor.factoryNumber = this.newInventor.fullname['factoryNumber'];
    this.newInventor.selectedItemType = (typeof this.newInventor.fullname !== "string"  && this.notNull( this.newInventor.fullname['itemType']))? this.newInventor.fullname['itemType']: {name: ""};
    this.newInventor.selectedItemStatus = (typeof this.newInventor.fullname !== "string"  && this.notNull( this.newInventor.fullname['itemStatus']))? this.newInventor.fullname['itemStatus']: {name: ""} ;
    this.newInventor.selectedSupplier = this.newInventor.fullname['supplier'];
    this.newInventor.invoice = this.newInventor.fullname['invoice'];
    this.newInventor.inspectionNumber = this.newInventor.fullname['inspectionNumber'];
    this.newInventor.price = this.newInventor.fullname['price'];
    this.newInventor.invoiceAddon = this.newInventor.fullname['invoiceAddon'];
    this.newInventor.selectedBarcode = this.newInventor.fullname['barCodeType'];
    this.newInventor.barCodeType = this.newInventor.fullname['barCodeType']['id'];
    this.newInventor.barCode = '';
    this.newInventor.measureUnit = this.newInventor.fullname['measureUnit']['id'];
    this.newInventor.itemGroup = this.newInventor.fullname['itemGroup']['id'];
    this.newInventor.itemGroupName = this.newInventor.fullname['itemGroup']['name'];
    this.newInventor.spend = this.newInventor.fullname['itemGroup']['spend'];
    this.newInventor.isCar = this.newInventor.fullname['itemGroup']['isCar'];
    this.newInventor.consumption = (this.newInventor.spend === 1);

  }
  inventorFrustrate() {
    this.parseData();
    console.log(this.newInventor)
    this.operation.getAddonNumber({type: 'Stock/Income', subType: ''})
      .then(response => {
        if (response['status'] === 200) {
          this.addon = response['data'];
          if (this.newInventor.itemGroup !== undefined && this.newInventor.consumption === false && this.newInventor.isCar !== 1) {
            let formData = new FormData();
            if(this.uploadedFiles.length > 0) {
              formData.append('file', this.uploadedFiles[0]);
            }

            this.operation.getFreeCodes({
              barCodeType: this.newInventor.barCodeType,
              count: this.newInventor.amount,
              start: (this.newInventor.spend === 0 && (this.newInventor.barCode !== undefined && this.newInventor.barCode !== null)) ?  this.newInventor.barCode : ''
            }, formData)
              .then((response: {
                TotalCount: number,
                status: number,
                success: boolean,
                totalCount: number,
                data: Barcode[]
              }) => {
                this.newInventor['showAmount'] = 1;
                this.lastBarCodes = response.data.map(value => {
                  value.fullBarcode = value.value + value.barCodeVisualValue;
                  value.factoryNumber = this.newInventor.factoryNumber;
                  return value;
                });
                // @ts-ignore
                this.newInventor.list =this.lastBarCodes.map(value => {
                  return {
                    barCode: (value.barCodeVisualValue === undefined) ? null : value.barCodeVisualValue,
                    serialNumber: value.factoryNumber,
                    amount: this.newInventor.showAmount
                  };
                }),
                this.lastBarCode.emit( {barcode: this.lastBarCodes, addon: this.addon});
                this.onInventorData.emit(this.newInventor);

                this.frustrate = true;
                this.onCloseNewInventorDialog.emit('close')
              })
              .catch(response => {
                this.frustrate = false;
                this.error('შეცდომა', response['error']);
              });
          } else {
            this.newInventor.barCodeType = null;
            this.newInventor.barCode = null;
            this.newInventor['showAmount'] = this.newInventor.amount;
            for (let i = 0; i < 1; i++) {
              this.lastBarCodes.push({value: '', barCodeVisualValue: ''});
              this.frustrate = true;
            }
          }
        }
      });
  }

  onUpload(event) {
    this.uploadedFiles=[];
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
