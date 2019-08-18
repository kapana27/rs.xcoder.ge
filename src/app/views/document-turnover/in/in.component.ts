import { Component, OnInit } from '@angular/core';
import { Mail } from '../../../models/mail';
import { MailService } from '../../../services/mails/mail.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.scss']
})
export class InComponent implements OnInit {

  datasource: Mail[];

  mails: Mail[];

  totalRecords: number;

  cols: any[];

  loading: boolean;


  constructor(private mailService: MailService) { }

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

}
