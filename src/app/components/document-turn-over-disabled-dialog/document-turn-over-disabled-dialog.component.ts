import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {OperationsService} from "../../services/operations/operations.service";

@Component({
  selector: 'app-document-turn-over-disabled-dialog',
  templateUrl: './document-turn-over-disabled-dialog.component.html',
  styleUrls: ['./document-turn-over-disabled-dialog.component.scss']
})
export class DocumentTurnOverDisabledDialogComponent implements OnInit {
  @Input() newMessageBox: boolean = false;
  @Input() list: string = "";
  @Input() selectedUser: any;
  @Input() note: any;
  @Input() chains: any[] = [];
  @Output() onClose = new EventEmitter();

  toUsers: any[] = [];
  ccBcc: boolean = false;
  item: {
    name?: any;
    count?: number
  } = {};
  text: any = '';
  itemGroupDialog: boolean = false;
  uploadFiles: any[] = [];
  filesDialog: boolean = false;
  @Input() selectedItems: any[] = [];
  @Output() onFilterName = new EventEmitter();
  @Input() users: any[] = [];
  message: {
    selectedUserId?: any;
    items?: any[],
    note?: string
  } = {};
  mails: any;


  constructor(private Request: RequestService,  private operation: OperationsService) { }

  ngOnInit() {
    this.searchToUser({query: ''})
    this.message.note = this.note;
  }

  searchToUser(event) {
    this.operation.getStaffList(event.query).then((data: any[]) => {
      this.toUsers = data;
    });
  }

  add(){
    this.itemGroupDialog = true;
  }

  deleteItem(index) {
    this.selectedItems= this.selectedItems.filter(((value, index1) => index1 !== index ));
  }

  onSelectedItemCatalog($event) {
    this.selectedItems = $event;
    this.itemGroupDialog =false;
  }

  filterUsers($event: any) {
    this.onFilterName.emit($event)
  }

  selectUser($event: any) {
    this.message.selectedUserId=$event['id'];
  }

  send() {
    this.message.items = this.selectedItems;

    this.operation.createDocuments({
      list: this.list,
      receiver: this.message.selectedUserId,
      note: this.message.note,
      items: this.message.items.map(value => {
        console.log(value)
        return  {
          "catalogId": value['id'],
          "amount": value['counter'],
          "note":value['note']
        }
      })
    }).then(response=>{
      alert("გაიგზავნა წარმატებით");
      this.newMessageBox = false;
    })
      .catch(reason => {
        alert("დაფიქსირდა შეცდომა "+ reason['data']);
      })

  }

  close() {
    this.onClose.emit(false)
  }

  closeGroupDialog() {
    this.itemGroupDialog = false;
  }
}
