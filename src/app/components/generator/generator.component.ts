import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransferToSection} from "../../models/transfer-to-section";

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  @Input() transferToSection: TransferToSection ={};
  @Input() name: string;
  @Output() onChangeAddon: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  change() {
    console.log(this.transferToSection);
    this.onChangeAddon.emit({addon: this.transferToSection.addon['Right']})
  }
}
