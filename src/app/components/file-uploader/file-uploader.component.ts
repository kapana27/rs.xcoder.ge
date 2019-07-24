import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Config} from '../../config/config';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [ConfirmationService]
})
export class FileUploaderComponent implements OnInit {
  uploadedFiles: any[] = [];
  @Output() onFiles = new EventEmitter();
  @Input() files: Array<any>;
  prod: any;

  constructor(private Request: RequestService, private confirmationService: ConfirmationService, ) {
    this.prod = this.Request.prod;
  }

  ngOnInit() {
      this.uploadedFiles = this.files;
  }

  onUpload(event) {
    for (const file of event.originalEvent['body']['data']) {
      this.uploadedFiles.push(file);
    }
    this.onUploadedFiles();
  }

  onDelete(file) {
    this.confirmationService.confirm({
      message: 'დარწმუნებული ხართ, რომ გსურთ წაშლა?',
      accept: () => {
        this.Request.Get(Config.List.get.deleteFile + '?id=' + file['id'])
          .then(response => {
            this.uploadedFiles = this.uploadedFiles.filter(value => {
              return value['id'] !== file['id'];
            });
            this.onUploadedFiles();
          })
          .catch();
      }
    });

  }

  onUploadedFiles() {
    console.log(this.uploadedFiles);
     this.onFiles.emit(this.uploadedFiles);
  }
}
