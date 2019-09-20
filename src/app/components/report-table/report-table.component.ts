import {Component, Input, OnInit} from '@angular/core';
import {LazyLoadEvent} from "primeng/api";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']

})
export class ReportTableComponent implements OnInit {

  @Input() confUrl: any;
  @Input() detailUrl: any;
  @Input() aditional: boolean = false;
  dataUrl: string ="";
  datasource: any[];
  event: any;
  display: boolean = false;
  data: any[];

  totalRecords: number = 100;

  cols: any[];

  loading: boolean =true;
  private detail: {
    dataUrl?: string;
    reportTable?: string
  } ={};
  title: any= '';

  constructor(private Request: RequestService) { }

  ngOnInit() {
    this.Request.Get(this.confUrl).then((response: { data:{
       cols: any[],
        dataUrl: string,
        detail: { dataUrl: string, reportTable: string }
      } })=>{
          this.dataUrl=response['data']['dataUrl'];
          this.detail=this.notNull(response.data.detail)?response.data.detail: {};
         if(this.notNull(this.detail)){
           this.cols=response.data.cols;
           this.cols.push({ field: 'detail', header: 'დეტალები', width:'130px'});
         }else{
           this.cols=response.data.cols;
         }
       this.loadCarsLazy(this.event)
    }).catch()

  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
     this.event = event;
    this.Request.Get((this.aditional)? (this.detailUrl+"&start="+event.first+"&limit="+event.rows) :  (this.dataUrl+"?start="+event.first+"&limit="+event.rows)).then((response: {data: any[],totalCount: number})=>{
      this.data = response.data;
      this.totalRecords = response.totalCount;
      this.loading = false;
      console.log(this.data, this.totalRecords)
    }).catch(()=>{
      this.loading=false;
    })
  }

  notNull(value) {
    return (value !== undefined && value !== null && value !== "");
  }

  details(data: any) {
      console.log(data)
    this.title = data['name'];
    this.display = true;
    this.detail['id']=data['id']
  }
}
