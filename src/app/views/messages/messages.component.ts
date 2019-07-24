import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../services/messages/messages.service';
import {ConfirmationService, MenuItem, Message} from 'primeng/api';
import {OperationsService} from '../../services/operations/operations.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [ConfirmationService]
})
export class MessagesComponent implements OnInit {
  attachmentDialog: boolean = false;
  attachments: Array<any>=[];
  totalRecord: number = 0;
  selectedTotalRecord: number = 0;
  params = {
    page: 1,
    start: 0,
    limit: 30,
    approved: 0
  };
  selectedParams = {
    page: 1,
    start: 0,
    limit: 30,
    id: 0
  };
  data: any[] = [];
  selectedData: any[] = [];
  filteredData: Array<any> = [];
  items1: MenuItem[];
  selectedCar3: any;
  msgs: Message[] = [];

  constructor(private messageService: MessagesService, private confirmationService: ConfirmationService, private operationService: OperationsService) { }
  ngOnInit() {
    this.items1 = [
      {label: 'მისაღები',  command: (event) => {
        this.params.approved = 0;
        this.selectedParams.id = 0;
        this.params.start = 0;
          this.getList();
        }},
      {label: 'მიღებული', command: (event) => {
          this.params.approved = 1;
          this.params.start = 0;
          this.selectedParams.id = 0;
          this.getList();
        }},
      {label: 'უარყოფილი', command: (event) => {
          this.params.approved = 2;
          this.params.start = 0;
          this.selectedParams.id = 0;
          this.getList();
        }}
    ];

    this.getList();

  }
  getList() {
    this.selectedData = [];
    this.messageService.getMessages(this.params)
      .then(response => {
        if (response['status'] === 200) {

          this.totalRecord = response['totalCount'];
          this.data = response['data'].map(v => {
            v['date'] = v['entryDate'].substr(0, 10);
            return v;
          });
        }
        console.log(response);
      })
      .catch();
  }
  paginate($event: any) {
   this.params.start = ($event['page'] * $event['rows']);
   this.getList();
  }
  rowSelect(event: any) {
    this.selectedParams.id = event['data']['id'];
    this.messageService.getSelectedMessages(this.selectedParams)
      .then(response => {
      if (response['status'] === 200) {

        this.selectedTotalRecord = response['totalCount'];
        this.selectedData = response['data'].map(v => {
          v['item']['maker'] = v['item']['maker'] !== undefined? v['item']['maker']: { name: ""};
          v['item']['model'] = v['item']['model'] !== undefined? v['item']['model']: { name: ""};
          v['item']['price'] = v['item']['price'] !== undefined? v['item']['price']: "";
          v['item']['name'] = v['item']['name'] !== undefined? v['item']['name']: "";
          // tslint:disable-next-line:max-line-length
          v['item']['fullBarcode'] = v['item']['fullBarcode'] !== undefined? v['item']['barCodeType']['value'] + new Array(v['item']['barCodeType']['length'] - (v['item']['barcode'].toString().length - 1)).join('0').slice((v['item']['barCodeType']['length'] - (v['item']['barcode'].toString().length - 1) || 2) * -1) + v['item']['barcode']: "";
          return v;
        });
      }
      console.log(response);
    })
      .catch();
    console.log(event);

  }
  selectedPaginate($event: any) {
    this.selectedParams.start = ($event['page'] * $event['rows']);
    this.rowSelect({data: { id: this.selectedParams.id}});
  }
  confirm(type) {
    if (type === 1) {
      console.log(22222);
      this.confirmationService.confirm({
        message: 'დარწმუნებული ხართ რომ გსურთ უარყოფა?',
        header: 'უარყოფა',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.messageService.confirm( 'NotApprove', this.selectedParams.id)
              .then(response => {
                if (response['status'] === 200) {
                  this.selectedParams.id = 0;
                  this.getList();
                }
              }).catch();

        },
        reject: () => {
        }
      });
    } else {
      this.messageService.confirm( 'Approve', this.selectedParams.id)
        .then(response => {
          if (response['status'] === 200) {
            this.selectedParams.id = 0;

            this.getList();
          }
        }).catch();
    }

  }
  download(d) {
    this.attachmentDialog = false;

    this.operationService.getAllAttachments(d['id'])
      .then(response=>{
        this.attachments = response['data'];
        this.attachmentDialog = true;

      })
      .catch()
  }
}
