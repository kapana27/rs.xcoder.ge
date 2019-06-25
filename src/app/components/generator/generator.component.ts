import {Component, Input, OnInit} from '@angular/core';
import {TransferToSection} from "../../models/transfer-to-section";

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  @Input() transferToSection: TransferToSection ={};

  constructor() { }

  ngOnInit() {
  }

}
