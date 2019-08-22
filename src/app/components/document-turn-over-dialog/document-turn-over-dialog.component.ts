import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { OperationsService } from '../../services/operations/operations.service';

@Component({
  selector: 'app-document-turn-over-dialog',
  templateUrl: './document-turn-over-dialog.component.html',
  styleUrls: ['./document-turn-over-dialog.component.scss']
})
export class DocumentTurnOverDialogComponent implements OnInit {
  toUsers: any[] = [];
  list: any[] = [];
  ccBcc: boolean = false;
  item: {
    name?: any;
    count?: number
  } = {};
  text: any = '';
  constructor(private Request: RequestService,  private operation: OperationsService) { }

  ngOnInit() {
  }

  searchToUser(event) {
    this.operation.getStaffList(event.query).then((data: any[]) => {
          this.toUsers = data;
      });
  } 

  add(){
    this.list.push(this.item);
    this.item = {};
  }

  deleteItem(index) {
    this.list= this.list.filter(((value, index1) => index1 !== index ));
  }
}
