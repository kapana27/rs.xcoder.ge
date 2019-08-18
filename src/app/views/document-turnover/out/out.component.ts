import { Component, OnInit } from '@angular/core';
import { Mail } from '../../../models/mail';
import { MailService } from '../../../services/mails/mail.service';
import { LazyLoadEvent, DialogService } from 'primeng/api';
import { DocumentTurnOverDialogComponent } from '../../../components/document-turn-over-dialog/document-turn-over-dialog.component';

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


  constructor(private mailService: MailService, public dialogService: DialogService) { }

  ngOnInit() {
     this.loading = true;
    this.mailService.getData(0, 30)
    .then((response: Mail[]) => {
      this.mails = response;
      this.totalRecords = this.mails.length;
      this.loading = false;
    }).catch();

    this.cols = [
        { field: 'files', header: '',  width: 50 },
        { field: 'ready', header: '' , width: 50 },
        { field: 'docNumber', header: 'დოკუმენტი' },
        { field: 'date', header: 'თარიღი' },
        { field: 'category', header: 'კატეგორია' },
        { field: 'senders', header: 'გამომგზავნი' }
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
        width: '70%'
    });
}
}
