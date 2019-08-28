import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  event: any;
  @Input() cols: any[] = [];
  @Input() uri: string = '';
  @Input() update: number  = 0;
  @Input() selectionMode: string  = 'single';
  @Output() onSelected = new EventEmitter();
   loading: boolean = false;
  totalRecords: number;
  dataSource: any[] = [];
  selected: any[] = [];




  constructor(private Request: RequestService) { }

  ngOnInit() {
    this.loading = true;
  }

  loadLazy($event: any) {
    this.event = $event;
    console.log(this.event);
      this.Request.Post(this.uri+"?start="+$event['first']+"&limit="+$event['rows'])
        .then(response=>{
          this.loading = false;
          this.totalRecords = response['TotalCount'];
          this.dataSource = response['data'].map(v=>{
            v['date']=v['entryDate'].substring(0,10);
            return v;
          });
        })
        .catch()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
     if(changes['update'].previousValue != undefined && changes['update'].currentValue != changes['update'].previousValue){
       this.loadLazy(this.event)
     }
  }

  typeof(rowDatumElement) {
      return typeof rowDatumElement;
  }

  selectionChange() {
    this.onSelected.emit(this.selected)
  }
}
