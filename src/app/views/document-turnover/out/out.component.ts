import { Component, OnInit } from '@angular/core';
import { Mail } from '../../../models/mail';
import { MailService } from '../../../services/mails/mail.service';
import { LazyLoadEvent, DialogService } from 'primeng/api';
import { DocumentTurnOverDialogComponent } from '../../../components/document-turn-over-dialog/document-turn-over-dialog.component';
import {TreeNode} from "../../../models/tree-node";
import {DocumentService} from "../../../services/document/document.service";
import {OperationsService} from "../../../services/operations/operations.service";

@Component({
  selector: 'app-out',
  templateUrl: './out.component.html',
  styleUrls: ['./out.component.scss'],
  providers: [DialogService]

})
export class OutComponent implements OnInit {

  datasource: Mail[];
  mails: Mail[];
  totalRecords: number;
  cols: any[];
  loading: boolean;
  choseSubjectBox: boolean = false;
  item: {
    name?: any;
    mark?: any;
    model?: any;
    count?: number
  } = {};
  list: any[] = [];
  filesDialog: boolean = false;
  selectedCatalogs: any[] = [];
  newMessageBox: boolean = false;
  public update: number = 0;
  private users: any[] = [];

  constructor(private mailService: MailService, public dialogService: DialogService, private operation: OperationsService) { }

  ngOnInit() {
     this.loading = true;
    this.mailService.getData(0, 30)
    .then((response: Mail[]) => {
      this.mails = response;
      this.totalRecords = this.mails.length;
      this.loading = false;
    }).catch();

    this.cols = [
        { field: 'id', header: 'მოთხოვნის N' },
        { field: 'date', header: 'თარიღი' },
        { field: 'sender.fullname', header: 'ვინ' },
        { field: 'sender.department.name', header: 'უწყება' },
        { field: 'sender.position.name', header: 'თანამდებობა' },
        { field: 'receiver.fullname', header: 'ვის' },
        { field: 'receiver.department.name', header: 'უწყება' },
        { field: 'receiver.position.name', header: 'თანამდებობა' }
    ];
    this.newMessage();
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
     console.log(event);

    this.mailService.getData(event.first, (event.first + event.rows))
    .then((response: Mail[]) => {
      this.mails = response;
      this.totalRecords = this.mails.length;
      this.loading = false;
    }).catch();
  }

  show() {
    const ref = this.dialogService.open(DocumentTurnOverDialogComponent, {
        header: 'მოთხოვნის დამატება',
        width: '1200px',
        baseZIndex : 10000
    });
}



  add() {
    this.list.push(this.item);
    this.item = {};
  }

  deleteItem(index) {
    this.list= this.list.filter(((value, index1) => index1 !== index ));
  }

  choseSubject() {
    this.choseSubjectBox = true;
  }


  newMessage() {
    this.newMessageBox = true;
  }

  onClose($event: boolean) {
      this.newMessageBox = $event;
      this.update++;
  }

  onFilterName($event) {
    this.operation.getAllChiefUsers($event['query'])
      .then(response=>{
        this.users = response['data'];
      })
      .catch()
  }
}
