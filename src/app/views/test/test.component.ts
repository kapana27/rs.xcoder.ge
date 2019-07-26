import { Component, OnInit } from '@angular/core';
import {Default} from "../../models/default";
import {Employee} from "../../models/employee";
declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  selectedItem: any = {};

  additional:{
    dialog: boolean,
    selected?: Default
  } = {
    dialog:false,
    selected: {
      id: null,
      name: ""
    }
  };
  employee:{
    dialog: boolean,
    selected?: Default
  } = {
    dialog:false,
    selected: {
      id: null,
    }
  };

  private interval: any;
  constructor() {
    this.selectedItem[1]={id:-1, name:'არჩეული დეპარტამენტი',demo: 1};
    this.selectedItem[2]={id:-1,name:'არჩეული სამმართველო',demo:1};

  }

  ngOnInit() {}

  selected($event: any, level) {
    if(level===1){
      this.selectedItem= {};
      this.selectedItem[1]={id:-1, name:'არჩეული დეპარტამენტი',demo: 1};
      this.selectedItem[2]={id:-1,name:'არჩეული სამმართველო',demo:1}
    }

    this.selectedItem[level]= $event;
  }

  additionButton($event){
    console.log($event)
    this.additional.selected =$event;
    console.log(this.additional.selected);
    this.additional.dialog = true;
  }


  onNewEmployee($event: any) {
    this.employee.selected=$event;

    this.employee.dialog = true;
    console.log($event);
  }
}
