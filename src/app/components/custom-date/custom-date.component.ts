import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-loading-overlay',
  template: `
    <div class="form-group">
      <div class="input-group">
        <input class="form-control ag-input-wrapper custom-date-filter ag-custom-component-popup"
               name="dp" [(ngModel)]="model" ngbDatepicker #d="ngbDatepicker"  (ngModelChange)="selected()" >
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
      }`
  ]
})
export class CustomDateComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};
  private params: any;
  private picker: any;

  agInit(params: any): void {
    this.params = params;
  }
  constructor(private calendar: NgbCalendar) {
  }


  ngOnInit(): void {
  }

  selected() {
    console.log()
  }
}
