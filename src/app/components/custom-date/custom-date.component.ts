import {AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import flatpickr from 'flatpickr';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-loading-overlay',
  template: `
    <div class="form-group">
      <div class="input-group" #flatpickrEl > 
        <input name="dp"  ngbDatepicker #d="ngbDatepicker"  class="form-control ag-input-wrapper custom-date-filter ag-custom-component-popup flatpickr-input"  (dateSelect)="selected($event)"   data-input  >
        <div class="input-group-append">
          <p-button (click)="d.toggle()" icon="pi pi-calendar"></p-button>
      
        </div>
      </div>
    </div>
  `,
  styles:[
    `
      .custom-date-filter a {
        position: absolute;
        right: 20px;
        color: rgba(0, 0, 0, 0.54);
        cursor: pointer;
      }

      .custom-date-filter:after {
        position: absolute;
        content: '\\f073';
        display: block;
        font-weight: 400;
        font-family: 'Font Awesome 5 Free';
        right: 5px;
        pointer-events: none;
        color: rgba(0, 0, 0, 0.54);
      }`,

  ],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]

})
export class CustomDateComponent implements OnInit, AfterViewInit  {
  @ViewChild("flatpickrEl", {static: false, read: ElementRef}) flatpickrEl: ElementRef;

  model: NgbDateStruct;
  date: Date;
  private params: any;
  private picker: any;

  agInit(params: any): void {
    this.params = params;
  }
  constructor(private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.picker = flatpickr(this.flatpickrEl.nativeElement, {
      wrap: true
    });
  }
  selected($event) {
    console.log($event)
    this.date = new Date(moment($event['year'] + '-' + format($event['month']) + '-' +format( $event['day'])).format('YYYY-MM-DD'));
    console.log(this.picker)

    this.params.onDateChanged();
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date ;
    this.picker.setDate(date,null, "DD-MM-YYYY");
  }
}
function format(f) {
  return f.toString().length === 1 ? '0' + f : f;
}
