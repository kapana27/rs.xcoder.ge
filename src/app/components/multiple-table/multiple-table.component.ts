import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfirmationService, LazyLoadEvent} from "primeng/api";
import {RequestService} from "../../services/request.service";
import {OperationsService} from "../../services/operations/operations.service";
declare var $: any;

@Component({
  selector: 'app-multiple-table',
  templateUrl: './multiple-table.component.html',
  styleUrls: ['./multiple-table.component.scss'],
  providers:[ConfirmationService]
})
export class MultipleTableComponent implements OnInit, OnChanges {

  dialogType: string = 'დამატება';
  @Input() disableClass: boolean = false;
  @Input() cols: any[] = [];
  @Input() changer: any;
  @Input() parent: any ;
  @Input() header: any = '&nbsp';
  @Input() tooltip: any = '';
  @Input() additionButton: boolean = false;
  @Input() title: any = '&nbsp';
  @Input() filter: boolean = false;
  @Input() filterTitle: any = '';
  @Output() public onSelected = new EventEmitter();
  @Output() onAdditionAction  = new EventEmitter();
  @Output() onEmployeeAction  = new EventEmitter();
  @Input() enableActions: boolean = true;
  @Input() multiple: boolean = false;
  @Input() actions: {
    get?: string;
    insert?: string;
    update?: string;
    delete?: string;
  };
  event: any;
  selectedRow: any = '';
  data: any[];
  totalRecords: number;
  loading: boolean =false;
  filterValue: any = '';
  start: number = 0;
  limit: number = 100;
  newItemDialog: boolean = false;
  thisProperty: any;
  selectedRows: Array<any> =[];
  interval: any;
  @Input() checkEditionStatus: boolean = false;
  @Input() scrollHeight = "calc(100vh - 100px)";

  provider: {
    id?: any,
    new: boolean,
    dialog: boolean,
    selected?: any,
    type?: any,
    identification?: string,
    value?: string
  } = { dialog: false, new: true, selected: null, value: null};

  constructor(private Request: RequestService,private confirmationService: ConfirmationService, private operation: OperationsService) {
    this.loading = true;
    this.thisProperty=this;


  }

  ngOnInit() {
    console.log(this.tooltip);
  }

  loadLazy(event: LazyLoadEvent, param?: string) {
    this.event = this.notNull(event)? event: {first: 0, rows: 30};
    this.loading = true;
    const filtered = (this.filterValue)? "&name="+this.filterValue: "";
    const operator = (this.actions.get.indexOf("?") ===-1)? '?': '&';
    this.Request.Get(this.actions.get+operator+"start="+this.event['first']+"&limit="+this.event['rows']+filtered )
      .then(response=>{
        this.loading = false;
        this.data = response['data'];
        this.totalRecords = response['totalCount'];
      });
  }

  onRowSelect($event: any) {
    this.selectedRow= $event['data'];
    this.onSelected.emit($event['data']);
  }

  changeValue() {
     this.loadLazy(this.event)
  }

  onDelete() {
    if(this.notNull(this.selectedRow)){
      this.confirmationService.confirm({
        message: `დარწმუნებული ხართ, რომ გსურთ "${this.selectedRow['name']}"-ს  წაშლა?`,
        accept: () => {
          const operator = (this.actions.delete.indexOf("?") ===-1)? '?': '&';
          this.Request.Post(this.actions.delete+operator+"id="+this.selectedRow['id'])
            .then(response=>{
              this.loadLazy(this.event);
              this.selectedRow='';
            }).catch(reason => {
            alert(reason['error'])
          })
        }
      })

    }
  }
  private notNull(value) {
    return (value !== undefined && value !== null && value !=='');
  }

  editItem() {
    if(this.notNull(this.selectedRow)) {
        if(!this.notNull(this.selectedRow['id'])){
          const operator = (this.actions.insert.indexOf("?") ===-1)? '?': '&';
          const parent = this.notNull(this.parent)? "&parent="+this.parent['id']: '';
          this.Request.Post(this.actions.insert+operator+"name="+this.selectedRow['name']+parent)
            .then(response=>{
              this.data.push(response['data']);
              this.totalRecords++;
              this.selectedRow='';
              this.newItemDialog = false;
            }).catch(reason => {
            alert(reason['error'])
          })
        }else{
          const operator = (this.actions.update.indexOf("?") ===-1)? '?': '&';
          this.Request.Post(this.actions.update + operator + "id=" + this.selectedRow['id'] + "&name=" + this.selectedRow['name'])
            .then(response => {
              this.newItemDialog = false;
            }).catch(reason => {
            alert(reason['error'])
          });
        }
    }
  }



  ngOnChanges(changes: SimpleChanges): void {
    this.loadLazy(this.event);
    this.selectedRows = [];
    this.selectedRow = '';

  }


  onUnselect($event: any) {
  }

  edit() {

    this.dialogType = 'რედაქტირება';
    if(this.notNull(this.selectedRow)) {
      if (this.notNull(this.selectedRow['id'])) {
        if(this.multiple){
          this.provider = {
            dialog: true,
            new: false,
            id: this.selectedRow['id'],
            selected: this.selectedRow['type'].toString(),
            identification: this.selectedRow['code'],
            value: this.selectedRow['name'],
          };
          this.changeZindex()
          return;
        }
        this.newItemDialog = true;
        this.changeZindex()
      }
    }
  }

  addition() {
    if(this.notNull(this.selectedRow['id'])) {
      this.onAdditionAction.emit(this.selectedRow);
    }
  }

  changeZindex(){
    if(this.checkEditionStatus){
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        const children = $(".ui-widget-overlay");
        console.log("interval",children);
        if(children.length===2){
          console.log("clear",this.interval);
          $(children,children[0]).css("z-index",$(children,children[1]).css("z-index"))
          clearInterval(this.interval);
        }
      }, 100);
    }

  }

  additionEmployee() {
    console.log(this.selectedRow)
    if(this.notNull(this.selectedRow['id'])) {
      this.onEmployeeAction.emit(this.selectedRow);
    }
  }
  newItem() {
    if(this.multiple){
      this.provider.dialog = true;
      this.provider.new = true;
        return;
    }
    this.dialogType = 'დამატება';
    this.selectedRow={ name: '' };
    this.newItemDialog = true;
    this.changeZindex()

  }


  saveProvider() {
    if(this.provider.new){
      if (this.provider.value !== null ) {
        const operator = (this.actions.insert.indexOf("?") ===-1)? '?': '&';

        let  newItem = 'name=' + this.provider.value;
        newItem += (this.provider.identification !== null ) ? '&number=' + this.provider.identification : '';
        newItem += (this.provider.type !== null ) ? '&type=' + this.provider.selected : '';
        this.Request.Post(this.actions.insert+operator+newItem)
          .then(response=>{
            this.provider = { dialog: false, selected: null, value: null, new: true};
            this.data.push(response['data']);
          }).catch(reason => {
          alert(reason['error'])
        })
      }
    }else{
        if (this.notNull(this.provider.id)) {
          console.log("update", this.provider)

            const operator = (this.actions.insert.indexOf("?") ===-1)? '?': '&';
            let  newItem = 'name=' + this.provider.value;
            newItem += (this.provider.id !== null ) ? '&id=' + this.provider.id : '';
            newItem += (this.provider.identification !== null ) ? '&number=' + this.provider.identification : '';
            newItem += (this.provider.type !== null ) ? '&type=' + this.provider.selected : '';

            this.Request.Post(this.actions.update+operator+newItem)
              .then(response=>{
              this.loadLazy(this.event);
                this.provider = { dialog: false, selected: null, value: null, new: true};
              }).catch(reason => {
              alert(reason['error'])
            })
        }
      }

  }
}

