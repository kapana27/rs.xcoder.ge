import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() data: Array<any> = [];
  @Output() removeCartItem = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
      console.log("console.log");
  }


  clear() {
    this.removeCartItem.emit("removeAll")
  }
}
