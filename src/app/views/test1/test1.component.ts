import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {
  selectedItem: any = {};
  constructor() {
    this.selectedItem[1]={id:-1, name:'არჩეული რეგიონი',demo: 1};
    this.selectedItem[2]={id:-1,name:'არჩეული ქალაქი',demo:1};
    this.selectedItem[3]={id:-1,name:'არჩეული შენობა',demo:1}
  }

  ngOnInit() {}

  selected($event: any, level) {
    if(level===1){
      this.selectedItem= {};
      this.selectedItem[1]={id:-1, name:'არჩეული რეგიონი',demo: 1};
      this.selectedItem[2]={id:-1,name:'არჩეული ქალაქი',demo:1};
      this.selectedItem[3]={id:-1,name:'არჩეული შენობა',demo:1}
    }
    if(level===2){
      this.selectedItem[2]={id:-1,name:'არჩეული ქალაქი',demo:1};
      this.selectedItem[3]={id:-1,name:'არჩეული შენობა',demo:1}
    }
    this.selectedItem[level]= $event;
  }
}
