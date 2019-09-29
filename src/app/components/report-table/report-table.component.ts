import {Component, Input, OnInit} from '@angular/core';
import {LazyLoadEvent} from 'primeng/api';
import {RequestService} from '../../services/request.service';
const  d = new Date();
import * as moment from 'moment';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']

})
export class ReportTableComponent implements OnInit {

  @Input() confUrl: any;
  @Input() detailUrl: any;
  @Input() aditional: boolean = false;
  dataUrl: string = '';
  datasource: any[];
  event: any;
  display: boolean = false;
  data: any[];
  convertDate: string = '';
  totalRecords: number = 100;

  cols: any[];

  loading: boolean = true;
  private detail: {
    dataUrl?: string;
    reportTable?: string
  } = {};
  title: any = '';
  filter: {
    dateFrom?: any;
    dateTo?: any
  } = {
    dateFrom : { year: (new Date(moment().day(-6).toDate())).getFullYear(), month: (new Date(moment().day(-6).toDate())).getMonth() + 1, day: (new Date(moment().day(-6).toDate())).getDate()},
    dateTo: { year: (new Date().getFullYear()), month: (new Date().getMonth() + 1), day: (new Date().getDate())}
  };
  private excelUrl: string='';

  constructor(private Request: RequestService) {

      this.convertDate='dateFrom='+(this.filter.dateFrom.year.toString())+
        '-'+((this.filter.dateFrom.month.toString().length==1)? '0'+this.filter.dateFrom.month: this.filter.dateFrom.month)+
        '-'+((this.filter.dateFrom.day.toString().length===1)? '0'+this.filter.dateFrom.day: this.filter.dateFrom.day)+'&'+
        'dateTo='+(this.filter.dateTo.year.toString())+
        '-'+((this.filter.dateTo.month.toString().length===1)? '0'+this.filter.dateTo.month: this.filter.dateTo.month)+
        '-'+((this.filter.dateTo.day.toString().length===1)?'0'+this.filter.dateTo.day: this.filter.dateTo.day);

  }

  ngOnInit() {
    this.Request.Get(this.confUrl).then((response: { data: {
       cols: any[],
        dataUrl: string,
        detail: { dataUrl: string, reportTable: string }
      } }) => {
          this.dataUrl = response['data']['dataUrl'];
          this.detail = this.notNull(response.data.detail) ? response.data.detail : {};
         if (this.notNull(this.detail)) {
           this.cols = response.data.cols;
           this.cols.push({ field: 'detail', header: 'დეტალები', width: '130px'});
         } else {
           this.cols = response.data.cols;
         }
       this.excelUrl=response['data']['excelUrl'];
       this.loadCarsLazy(this.event);
    }).catch();

  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
     this.event = event;
    this.Request.Get(((this.aditional) ? (this.detailUrl + '&start=' + event.first + '&limit=' + event.rows) :  (this.dataUrl + '?start=' + event.first + '&limit=' + event.rows))+'&'+this.convertDate).then((response: {data: any[], totalCount: number}) => {
      this.data = response.data;
      this.totalRecords = response.totalCount;
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  notNull(value) {
    return (value !== undefined && value !== null && value !== '');
  }

  details(data: any) {
      console.log(data);
    this.title = data['name'];
    this.display = true;
    this.detail['id'] = data['id'];
  }

  refresh() {
    this.convertDate='dateFrom='+(this.filter.dateFrom.year.toString())+
      '-'+((this.filter.dateFrom.month.toString().length==1)? '0'+this.filter.dateFrom.month: this.filter.dateFrom.month)+
      '-'+((this.filter.dateFrom.day.toString().length===1)? '0'+this.filter.dateFrom.day: this.filter.dateFrom.day)+'&'+
      'dateTo='+(this.filter.dateTo.year.toString())+
      '-'+((this.filter.dateTo.month.toString().length===1)? '0'+this.filter.dateTo.month: this.filter.dateTo.month)+
      '-'+((this.filter.dateTo.day.toString().length===1)?'0'+this.filter.dateTo.day: this.filter.dateTo.day);
    this.loadCarsLazy(this.event);
  }
}
function getPreviousMonday()
{
  const date = new Date();
  const day = date.getDay();
  let prevMonday;
  if(date.getDay() == 0){
    prevMonday = new Date().setDate(date.getDate() - 7);
  }
  else{
    prevMonday = new Date().setDate(date.getDate() - day);
  }

  return prevMonday;
}
