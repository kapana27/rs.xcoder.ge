import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() files: any;
  prod: any;

  constructor(private Request: RequestService) {
    this.prod = this.Request.prod;

  }

  ngOnInit() {
  }

  download(data) {
     console.log(data);
    window.open(this.prod + '/api/secured/Document/Download?id=' + data['id'], '_blank');
  }
}
