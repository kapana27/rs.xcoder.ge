import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfirmationService, LazyLoadEvent} from "primeng/api";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-multiple-table',
  templateUrl: './multiple-table.component.html',
  styleUrls: ['./multiple-table.component.scss'],
  providers:[ConfirmationService]
})
export class MultipleTableComponent implements OnInit, OnChanges {


  @Input() cols: any[] = [];
  @Input() changer: any;
  @Input() parent: any ;
  @Input() header: any = '&nbsp';
  @Input() title: any = '&nbsp';
  @Input() filter: boolean = false;
  @Input() filterTitle: any = '';
  @Output() public onSelected = new EventEmitter();
  @Input() enableActions: boolean = true;
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
  constructor(private Request: RequestService,private confirmationService: ConfirmationService) {
    this.loading = true;
    this.thisProperty=this;

  }

  ngOnInit() {}

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
        message: 'დარწმუნებული ხართ, რომ გსურთ წაშლა?',
        accept: () => {
          const operator = (this.actions.delete.indexOf("?") ===-1)? '?': '&';
          this.Request.Post(this.actions.delete+operator+"id="+this.selectedRow['id'])
            .then(response=>{
              this.loadLazy(this.event);
              this.selectedRow='';
            }).catch(reason => {
            alert(reason)
          })
        }
      })

    }
  }
  private notNull(value) {
    return (value !== undefined && value !== null);
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
            alert(reason)
          })
        }else{
          const operator = (this.actions.update.indexOf("?") ===-1)? '?': '&';
          this.Request.Post(this.actions.update + operator + "id=" + this.selectedRow['id'] + "&name=" + this.selectedRow['name'])
            .then(response => {
              this.newItemDialog = false;
            }).catch(reason => {
            alert(reason)
          });
        }
    }
  }


  newItem() {
    this.selectedRow={ name: '' };
    this.newItemDialog = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadLazy(this.event);
    this.selectedRows = [];

  }


  onUnselect($event: any) {
  }
}

