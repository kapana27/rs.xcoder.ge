import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-custom-input',
  template: `
    <input type="text" #i [value]="params.value" [disabled]="false"/>
  `
})
export class CustomInputComponent implements OnInit {
  @ViewChild('i', {static: false} ) textInput: ElementRef;
  params;

  constructor() { }

  ngOnInit() {
  }
  agInit(params: any): void {
    this.params = params;
  }

  getValue() {
    return this.textInput.nativeElement.value;
  }
}
