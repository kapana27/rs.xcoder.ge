import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestService} from '../../../services/request.service';
import {MenuService} from "../../../services/menu.service";
const  url = {
  '/report/invoice': '-2',
  '/report/documentTurnover': '-1',
  '/report/inventory': '-3',
  '/report/leadership': '-4',
};
interface Tab {
  tabName?: string;
  cols?: {field?: string, header?: string}[];
  dataUrl?: string;
  excelUrl?: string;
  configUrl?: string;
}
interface Folder {
  children?: Array<any>
  id?: number
  name?: string
  reportTable?: string
  type?: string
}
@Component({
  selector: 'app-report-component',
  templateUrl: './report-component.component.html',
  styleUrls: ['./report-component.component.scss']
})
export class ReportComponentComponent implements OnInit {
  data: Array<Tab> = [];
  folders: Array<Folder> =[];
  folder: Folder = {};

  state:Array<Folder> =[];
  selectedIndex: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private Request: RequestService, public MenuService: MenuService) {

    this.MenuService.clickMenu$.subscribe($event => {
      let url =this.router.url.split('/');
      if(url[1] === 'report'){
        this.getFolders();
        console.log(this.state)
      }
    });


    this.folders = [];
    this.data = [];
    /*this.Request.Post('/api/secured/Report/TabConfig?reportTable=' + url[this.router.url])
      .then((response: {status: number, data: Tab[] }) => {
        if (response['status'] === 200) {
          this.data = response.data;
        }
      });*/
    this.getFolders();

  }

  ngOnInit() {
  }

  onTabChange($event: any) {
    console.log($event)
    this.selectedIndex = $event['index'];
    this.getData(this.folder);
  }

  getFolders(){
    this.Request.Post('/api/secured/Report/Folders?folderId=' + url[this.router.url])
      .then((response: {status: number, data: Folder[] }) => {
        if (response['status'] === 200) {
          if(this.state.length === 0){
            this.state = response['data'];
          }
          this.folders=response['data'];
          this.data = [];
        }
      });
  }

  onClickFolder(folder: Folder) {
      this.folder = folder;
      if(folder.type === 'folder' &&  folder.children.length > 0){
          this.folders = folder.children;
      }else{
       this.getData(folder);
      }
  }

  getData(folder){
    this.Request.Post('/api/secured/Report/TabConfig?reportTable=' + folder.reportTable)
      .then((response: {status: number, data: Tab[] }) => {
        if (response['status'] === 200) {
          this.data = response.data;
        }
      });
  }

  goBack() {
    if(this.data.length>0){
      this.data=[]
    }else{
      this.folders=this.state;
    }
    console.log(this.data, this.folders, this.folder)

  }
}
