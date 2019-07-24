import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  items: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'საწყობის მართვის ზედდებულები\n', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'ქონების მართვის ზედდებულები\n', icon: 'fa fa-fw fa-calendar'}
      ];
  }

}
