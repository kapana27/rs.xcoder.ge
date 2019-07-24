import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  selectedItem: any = {};
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
}
