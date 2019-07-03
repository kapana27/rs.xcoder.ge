import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {DirectoryService} from "../../services/directory/directory.service";
import {Default} from "../../models/default";
import {OperationsService} from "../../services/operations/operations.service";
import {TreeNode} from "../../models/tree-node";

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  mainTabs: MenuItem[];
  subTabs: MenuItem[] = [];
  data: Default[] = [];
  activeItem: MenuItem;
  cars: Array<any> =[];
  lists: Default[] = [];
  selectType = 1;
  ItemGroup: TreeNode[] = [];
  employees: Array<any> = [];
  units: TreeNode[] = [];
  groups: TreeNode[] = [];
  constructor(private directoryService: DirectoryService, private operation: OperationsService) { }

  ngOnInit() {
    this.directoryService.getMeasureUnitTree()
      .then(value => {
        this.units = parseTree(value['children'] );
      }).catch();

      this.directoryService.getStructuralUnitTree()
        .then(value => {
          this.ItemGroup = parseTree(value['children'] );
        }).catch();


    this.operation.getItemGroup()
      .then(response=>{
        this.groups = parseTree(response['children']);
      })
      .catch();

    this.mainTabs = [
      {label: 'სტრუქტურა', type: 'structura',  icon: 'fa fa-fw fa-bar-chart', command: (event=>{
          this.selectType=1;
          this.getList(this.selectType);
          this.selectMainTab(event['item']);

        })},
      {label: 'თანამშრომლები',type: 'employees', icon: 'fa fa-fw fa-calendar',command: (event=>{
          this.selectMainTab(event['item']);
          this.employees = [];
        })},
      {label: 'საზომი ერთეული', type: 'unit', icon: 'fa fa-fw fa-book',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'სასაქონლო ჯგუფი',type: 'group', icon: 'fa fa-fw fa-support',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'ინვენტარის ტიპი',type: 'table', icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.selectMainTab(event['item']);
          this.operation.getItemTypes()
            .then(value => {
                this.data=value['data'];
            })
        })},
      {label: 'ინვენტარის სტატუსი', type: 'table', icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.operation.getItemStatus()
            .then(value => {
              this.data=value['data'];
            });
          this.selectMainTab(event['item']);

        })},
      {label: 'საწყობის სექცია', type: 'table', icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.selectMainTab(event['item']);
          this.operation.getStoks()
            .then(response=>{
              this.data = response["data"];
            })
            .catch();
        })},
    ];
    this.activeItem = this.mainTabs[0];
     this.getStructuralUnit();
     this.getList(this.selectType)
  }

  selectMainTab(tab){
    this.activeItem = tab;
  }

  getStructuralUnit(){
    this.directoryService.getStructuralUnit()
      .then(value => {
        for(const i in value['data'])
          this.subTabs.push({
          label: value['data'][i],
          type: i,
          id: i,
          icon: 'fa fa-fw fa-bar-chart'
        })
      })
      .catch(reason => {})
  }
  getList(type){
    this.directoryService.getList(type)
      .then(value => {
        this.lists = value['data'];
      })
      .catch()
  }

  handleChange($event) {
    this.selectType = Number(this.subTabs[$event['index']]['type']);
    this.getList(this.selectType);
  }


  selectedNode($event: any) {
    console.log($event);
    this.directoryService.getEmployees($event['id'])
      .then(value => {
           this.employees = value['data'];
           console.log(this.employees);
      })
      .catch()
  }

  test(rowData) {
    console.log(rowData);
  }
}
function parseTree(data: TreeNode[]): Array<TreeNode> {
  data.forEach( (value,index) => {
    data[index]['label']=value.text;
    data[index]['key'] = value.id;

    if(value.children !== undefined && value.children.length>0){
      parseTree(value.children);
    }
  });
  return data;
}
