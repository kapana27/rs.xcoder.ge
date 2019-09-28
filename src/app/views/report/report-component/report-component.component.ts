import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestService} from '../../../services/request.service';
const  url = {
  '/report/employee': 'staff',
  '/report/property': 'property',
  '/report/warehouse': 'stock',
};
interface Tab {
  tabName?: string;
  cols?: {field?: string, header?: string}[];
  dataUrl?: string;
  excelUrl?: string;
  configUrl?: string;
}
@Component({
  selector: 'app-report-component',
  templateUrl: './report-component.component.html',
  styleUrls: ['./report-component.component.scss']
})
export class ReportComponentComponent implements OnInit {
  data: Array<Tab> = [];

  constructor(private route: ActivatedRoute, private router: Router, private Request: RequestService) {

    this.Request.Post('/api/secured/Report/TabConfig?reportTable=' + url[this.router.url])
      .then((response: {status: number, data: Tab[] }) => {
        if (response['status'] === 200) {
          this.data = response.data;
        }
      });

  }

  ngOnInit() {
  }

  onTabChange($event: any) {
    console.log($event)
  }
}
