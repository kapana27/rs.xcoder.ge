import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit {
  @Output() removeCartItem = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  clear() {
    this.removeCartItem.emit('removeAll');
  }
}
