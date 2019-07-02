import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  mainTabs: MenuItem[];
  subTabs: MenuItem[];
  activeItem: MenuItem;
  cars: Array<any> =[];

  constructor() { }

  ngOnInit() {
    this.mainTabs = [
      {label: 'სტრუქტურა', type: 'structura',  icon: 'fa fa-fw fa-bar-chart', command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'თანამშრომლები',type: 'employees', icon: 'fa fa-fw fa-calendar',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'საზომი ერთეული', type: 'unit', icon: 'fa fa-fw fa-book',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'სასაქონლო ჯგუფი',type: 'table1', icon: 'fa fa-fw fa-support',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'ინვენტარის ტიპი',type: 'table', icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'ინვენტარის სტატუსი', type: 'table', icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'საწყობის სექცია', type: 'table', icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.selectMainTab(event['item']);
        })},
    ];
    this.subTabs = [
      {label: 'ქალაქი', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'შენობა', icon: 'fa fa-fw fa-calendar'},
      {label: 'დეპარტამენტი', icon: 'fa fa-fw fa-book'},
      {label: 'სამმართველო', icon: 'fa fa-fw fa-support'},
      {label: 'სექცია', icon: 'fa fa-fw fa-twitter'},
      {label: 'სტრუქტურული ერთეული', icon: 'fa fa-fw fa-twitter'},
    ];
    this.activeItem = this.mainTabs[0];
  }

  selectMainTab(tab){
    this.activeItem = tab;
    console.log(this.activeItem);
  }

}
