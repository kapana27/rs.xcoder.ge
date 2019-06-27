import { Injectable } from '@angular/core';
import {RequestService} from '../request.service';
import {Config} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private Request: RequestService) { }
  getMessages(params) {
    return this.Request.Get(Config.massage.get.list + '?approved=' + params['approved'] + '&page=' + params['page'] + '&start=' + params['start'] + '&limit=' + params['limit']);
  }

  getSelectedMessages(params) {
    return this.Request.Get(Config.massage.get.selectedList + '?id=' + params['id'] + '&page=' + params['page'] + '&start=' + params['start'] + '&limit=' + params['limit']);
  }

  confirm(type, id) {
    return this.Request.Post(Config.massage.post[type] + '?id=' + id, {});
  }
}
