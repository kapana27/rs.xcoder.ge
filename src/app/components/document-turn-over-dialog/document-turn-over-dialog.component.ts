import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { RequestService } from '../../services/request.service';
import { OperationsService } from '../../services/operations/operations.service';

@Component({
  selector: 'app-document-turn-over-dialog',
  templateUrl: './document-turn-over-dialog.component.html',
  styleUrls: ['./document-turn-over-dialog.component.scss']
})
export class DocumentTurnOverDialogComponent implements OnInit {
  @Input() newMessageBox: boolean = false;
  @Input() list: string = "";
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


  constructor(private Request: RequestService,  private operation: OperationsService) { }

  ngOnInit() {
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
