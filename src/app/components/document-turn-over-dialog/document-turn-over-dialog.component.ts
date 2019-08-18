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
  ccBcc: boolean = false;
  constructor(private Request: RequestService,  private operation: OperationsService) { }

  ngOnInit() {
  }

  searchToUser(event) {
    this.operation.getStaffList(event.query).then((data: any[]) => {
          this.toUsers = data;
      });
  } 


}
