import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements AfterViewInit{
  @Input() data: Array<any> = [];
  @Output() removeCartItem = new EventEmitter();
  @Output() checker = new EventEmitter();

  constructor() {

  }




  clear() {
    this.removeCartItem.emit("removeAll")
  }
  ngAfterViewInit() {
    this.check();
  }
  check(){
     const length = this.data.filter(value => value['count']<1 || (value['count']*1 > value['amount']*1-value['tmpAmount']*1)).length;
     console.log({status: length <= 0});
    this.checker.emit({status: length <= 0});

  }

}

