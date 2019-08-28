import { Component, OnInit } from '@angular/core';
import {Mail} from "../../../models/mail";
import {MailService} from "../../../services/mails/mail.service";
import {DialogService, LazyLoadEvent} from "primeng/api";
import {DocumentTurnOverDialogComponent} from "../../../components/document-turn-over-dialog/document-turn-over-dialog.component";
import {RequestService} from "../../../services/request.service";
import {OperationsService} from "../../../services/operations/operations.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [DialogService]

})
export class DepartmentComponent implements OnInit {

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
  public selected: any[] = [];
  public selectedCatalogItems: any[] = [];
  public users: any[] = [];
  public lists: string = '';
  newMessageBoxShow: boolean =false;
   selectedCatalogItem: any;
  receiver: any;
  note: any;
  private chains: any[] = [];
  constructor(private mailService: MailService, public dialogService: DialogService, private Request: RequestService, private operation: OperationsService) { }

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
    this.lists = this.selected.map(value => value['id']).toString();
    this.Request.Post("/api/secured/ItemRequest/Generate?list="+this.lists)
      .then(response=>{
        this.newMessageBox = true;
        this.selectedCatalogItems = response['data']

      }).catch()
  }

  onClose($event: boolean) {
    this.newMessageBox = $event;
    this.update++;
  }

  selectedItems($event: any[]) {
    this.selected = $event;

  }

  onFilterName($event) {
    this.operation.getAllChiefUsersFinance($event['query'])
      .then(response=>{
        this.users = response['data'].map(value=>{
          return {
            id: value['id'],
            fullname: value['fullname']
          }
        });
      })
      .catch()
  }

  showMessage() {
      if(this.selected.length> 0){

        this.Request.Post("/api/secured/ItemRequest/Select_Edit?id="+this.selected[0].id,{})
          .then(response=>{
            this.newMessageBoxShow =true;
            this.receiver = {id: response['data']['receiver']['id'], fullname: response['data']['receiver']['fullname']};
            this.note = response['data']['note'];
            this.chains = response['data']['chains'];
            this.selectedCatalogItem = response['data']['webRequestDetails'];
            console.log(response);
          })
          .catch()

      }
  }

  onCloseShow($event: boolean) {
    this.newMessageBoxShow =false;
  }
}
