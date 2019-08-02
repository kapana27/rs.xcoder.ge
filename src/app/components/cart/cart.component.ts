import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {toArray} from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements AfterViewInit {
  @Input() data: Array<{
    name?: string;
    spend?: any;
    barcode?: any;
    count?: any;
    tmpAmount?: any;
    amount?: any;
    uploadFiles?: Array<any>
  }> = [];
  @Output() removeCartItem = new EventEmitter();
  @Output() checker = new EventEmitter();
  uploadFiles: Array<any> = [];
  filesDialog: boolean = false;
  interval: any = null;

  constructor() {

  }

  changeZindex() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        const children = $('.ui-widget-overlay');
        console.log('interval', children);
        if (children.length === 2) {
          console.log('clear', this.interval);
          $(children, children[0]).css('z-index', $(children, children[1]).css('z-index'));
          clearInterval(this.interval);
        }
      }, 100);


  }
  uploadedFiles($event: any) {
    this.uploadFiles = $event;
  }

  clear() {
    this.removeCartItem.emit('removeAll');
  }
  ngAfterViewInit() {
    this.check();
  }
  check() {
     const length = this.data.filter(value => value['count'] < 1 || (value['count'] * 1 > value['amount'] * 1 - value['tmpAmount'] * 1)).length;
     console.log({status: length <= 0});
    this.checker.emit({status: length <= 0});

  }
  notNull(value) {
    return (value !== undefined && value !== null);
  }
  filesDialogOpen(row) {
    this.filesDialog = true;
    if (this.notNull(row['uploadFiles'])) {
      this.uploadFiles = row['uploadFiles'];
    } else {
      this.uploadFiles = [];
    }
    row['uploadFiles'] = this.uploadFiles;
    this.changeZindex();
  }

  countFiles(f) {
    if (f['uploadFiles'] !== undefined) {
      f['uploadFiles'] = this.uploadFiles;
      f['fileList'] = f['uploadFiles'].map(value => value['id']);
      return f['fileList'].length;
    }
    return 0;
  }


}

