import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {DirectoryService} from "../../services/directory/directory.service";
import {Default} from "../../models/default";
import {OperationsService} from "../../services/operations/operations.service";
import {ValidatorService} from "../../services/validator/validator.service";
export interface TreeNode {
  data?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
}

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
  providers:[ConfirmationService]
})
export class DirectoryComponent implements OnInit {
  selectedStructuralUnitTree: Default = { id:-1, name:'' };
  mainTabs: MenuItem[];
  subTabs: MenuItem[] = [];
  data: Default[] = [];
  activeItem: MenuItem;
  activeSubItem: MenuItem ;
  cars: Array<any> =[];
  lists: Default[] = [];
  selectType = 1;
  ItemGroup: TreeNode[] = [];
  employees: Array<any> = [];
  units: TreeNode[] = [];
  groups: TreeNode[] = [];
  structuralLevelGrid: Array<any> = [];
  cities: Default[] = [];
  filteredCities: Default[] = [];
  buildings: Default[] = [];
  departments: Default[] = [];
  divisions: Default[] = [];
  sections: Default[] = [];
  filterData: Array<any> = [];
  nameDialog: boolean = false;
  selectedGroup: TreeNode ={};
  formErrors: Array<string> = [];
  selectedEmployeeNode: TreeNode;
  employeeCities: Array<any> = [];
  employeeBuildings: Array<any> = [];
  newStructuralUnit: {
    selectedCity?: any;
    selectedBuilding?: any;
    selectedDepartment?: any;
    selectedDivision?:any;
    selectedSection?: any;
  } ={}
  newItem: {
    structuralUnitDialog?: boolean,
    parent_name?: any,
    measure_value?: number,
    measureValue?: number,
    main?: any;
    sub?: any;
    type?:string;
    action?: string;
    value: string,
    dialog: boolean,
    selectedItem?: any,
    elective?: Array<any>,
    consumption?: Array<any>,
    data?: any,
    isCar?:  Array<any>,
    isStrict?:  Array<any>,
  } = {
    value: '',
    dialog: false,
    elective: [],
    consumption: [],
    isCar:[],
    isStrict:[]
  };
  selectedNode1: TreeNode;
  structuralUnit: {
    dialog?: boolean,
    value?: any,
    type?: any
  } = {
    dialog: false
  };
  selectedEmployee: any;
  newEmployee: {
    type?: string;
    action?: string;
    id?: number;
    position?: any;
    dialog?: boolean;
    role?: {role: string, name: string};
    fname?: string;
    lname?:string;
    email?: string;
    mobile?: string;
    pin?: string;
    city?: any;
    building?: any;
    list?: Array<any>,
    department?: any
  } = {
    role:{role:"", name:""},
    list: []
  };
  roles: Array<{role: string, name: string}> =[];
  positions: Array<{id: string, name: string}> =[];

  selectedEmp:{
    dialog: boolean,
    selected?: Default
  } = {
    dialog:false,
    selected: {
      id: -1,
    }
  };
  selectedItem: any = {};


  constructor(private directoryService: DirectoryService, private operation: OperationsService,private confirmationService: ConfirmationService, private validator: ValidatorService) {
    this.activeSubItem={
      id: ''
    };
    this.selectedItem[1]={id:-1, name:'მწარმოებელი არჩეული არ არის'};

  }

  getMeasureUnits(){
    this.directoryService.getMeasureUnitTree()
      .then(response => {
        this.units =[
          {
            expanded: true,
            data: { id:0, name:"root"},
            children: response['data']
          }
        ];
      }).catch();
  }

  getItemGroup(){
    this.operation.getItemGroup()
      .then(response=>{
        this.groups = [
          {
            expanded: true,
            data: { id:0, name:"root"},
            children:response['data']
          }
        ];
      })
      .catch();
  }

  ngOnInit() {
    this.getMeasureUnits();
    this.getItemGroup();
    this.getStructuralUnit();

    this.mainTabs = [
      {label: 'სტრუქტურა', type: 'structura',  icon: 'fa fa-fw fa-bar-chart', command: (event=>{
          this.selectType=1;
          this.selectMainTab(event['item']);
        })},

      {label: 'საზომი ერთეული', type: 'unit', icon: 'fa fa-fw fa-book',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'სასაქონლო ჯგუფი',type: 'group', icon: 'fa fa-fw fa-support',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'ინვენტარის ტიპი',type: 'table', id:"ItemType", icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.selectMainTab(event['item']);
          this.getMainList("ItemType");
        })},
      {label: 'ინვენტარის სტატუსი', type: 'table', id:"ItemStatus", icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.getMainList("ItemStatus");
          this.selectMainTab(event['item']);
        })},
      {label: 'საწყობის სექცია', type: 'table',id: 'Stock', icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.selectMainTab(event['item']);
          this.getMainList("Stock");
      })},
      {label: 'მწარმოებელი', type: 'provider',id: 'provider', icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.selectMainTab(event['item']);
        })},
      {label: 'მომწოდებელი', type: 'provider1',id: 'provider1', icon: 'fa fa-fw fa-twitter',command: (event=>{
          this.selectMainTab(event['item']);
        })},
    ];


    this.activeItem = this.mainTabs[0];

    this.directoryService.getList(1)
      .then(value => {
        this.cities = value['data'];
      })
    this.directoryService.getList(2)
      .then(value => {
        this.buildings = value['data'];
      })
    this.directoryService.getList(3)
      .then(value => {
        this.departments = value['data'];
      })
    this.directoryService.getList(4)
      .then(value => {
        this.divisions = value['data'];
      })
    this.directoryService.getList(5)
      .then(value => {
        this.sections = value['data'];
      })
    this.directoryService.getList(6)
      .then(value => {
        this.sections = value['data'];
      })

  }
  getMainList(type){
    switch (type) {
      case 'ItemType':
        this.operation.getItemTypes()
          .then(value => {
            this.data=value['data'];
          })
        break;
      case 'ItemStatus':
        this.operation.getItemStatus()
          .then(value => {
            this.data=value['data'];
          });
        break;
      case "Stock":
        this.operation.getStoks()
          .then(response=>{
            this.data = response["data"];
          })
          .catch();
        break;
      default: break;
    }
  }
  selectMainTab(tab){
    this.activeItem = tab;
  }
  getStructuralUnitGrid(str){
    this.directoryService.getStructuralUnitLevelGrid(str)
      .then(value => {
        this.structuralLevelGrid = value['data'];
      })
      .catch()
  }
  getStructuralUnit(){
    this.subTabs.push({
      label: 'საშტატო ერთეული',
      type: 'structUnit1',
      id: 'structUnit1',
      icon: 'fa fa-fw fa-bar-chart'
    });
    this.subTabs.push({
      label: 'სტრუქტურული ერთეული',
      type: 'structUnit2',
      id: 'structUnit2',
      icon: 'fa fa-fw fa-bar-chart'
    });
    this.subTabs.push({
      label: 'თანამდებობა',
      type: 'structUnit3',
      id: 'structUnit3',
      icon: 'fa fa-fw fa-bar-chart'
    });
    this.subTabs.push({
      label: 'თანამშრომლები',
      type: 'employees',
      id: 'employees',
      icon: 'fa fa-fw fa-bar-chart'
    });
    this.activeSubItem = this.subTabs[0];
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
    this.activeSubItem = this.subTabs[$event['index']];
    this.getList(this.selectType);
  }
  getEmployees(){
    this.directoryService.getEmployees(this.selectedEmployeeNode['id'])
      .then(value => {
        this.employees = value['data'];
      })
      .catch()
  }
  selectedNode($event: any) {
    this.selectedEmployeeNode = $event;
    this.newEmployee.department = $event;
    this.getEmployees();
  }
  filter($event: Event, field: any) {
      if($event['value'] === null){
        const data = [];
        for(let i in this.filterData){
            if(i !== field){
                data[i]=this.filterData[i];
            }
        }
        this.filterData = data;
      }else{
        this.filterData[field]=$event['value']['id']
      }
    let filterString ='?';
    for(let i in this.filterData){
        filterString+=(i+'='+this.filterData[i]+"&");
    }
    this.getStructuralUnitGrid(filterString);
  }

  item(param: { action: string, type: string }) {

      this.newItem.type = param.type;
      this.newItem.action = param.action;
      this.newItem.main= this.activeItem;
      this.newItem.sub= this.activeSubItem;

      if(this.newItem.sub['type'] === "StructuralUnit"){
            this.newStructuralUnit ={};
            this.newItem.structuralUnitDialog =true;
            if(param.action ==='edit'){
              this.newStructuralUnit = {
                selectedCity: { id: this.newItem.selectedItem['type1']['id'], name: this.newItem.selectedItem['type1']['name']},
                selectedBuilding: { id: this.newItem.selectedItem['type2']['id'], name: this.newItem.selectedItem['type2']['name']},
                selectedDepartment: { id: this.newItem.selectedItem['type3']['id'], name: this.newItem.selectedItem['type3']['name']},
                selectedDivision: { id: this.newItem.selectedItem['type4']['id'], name: this.newItem.selectedItem['type4']['name']},
                selectedSection: { id: this.newItem.selectedItem['type5']['id'], name: this.newItem.selectedItem['type5']['name']},
              }
            }else{
              this.newStructuralUnit = {}
            }

          return ;
      }
    if(param.action==='edit' && this.newItem.selectedItem !== undefined){
      this.newItem.dialog = true;
    }else if (param.action==='new') {
      this.newItem.dialog = true;
    }

      console.log(this.newItem)
  }

  saveItem() {
      if(this.newItem.type === 'MeasureUnit'){
        this.saveUnit();
        return;
      }
      if(this.newItem.type === 'ItemGroup'){
        this.saveItemGroup();
        return;
      }
      const id=(this.newItem.action==='new')? '': "&id="+this.newItem.selectedItem['id'];
      const params = "parent=0&type="+this.newItem.sub['id']+"&name="+this.newItem.value+id;
      if(this.newItem.type ==='sub'){
        this.directoryService.postList(this.newItem.action , params)
          .then(response=>{
            this.getList(this.selectType);
            this.newItem.value = '';
            this.newItem.dialog = false;
          })
          .catch()
      }else{

        this.directoryService.postMainList(this.newItem.main['id'],this.newItem.action,params)
          .then(response=>{
            this.getMainList(this.newItem.main['id']);
            this.newItem.value = '';
            this.newItem.dialog = false;
          })
          .catch()
      }

  }
  onSelectGroup($event){
    this.selectedGroup = $event['node'];
    console.log($event);
  }
  onRowSelect($event: any) {
    this.newItem.selectedItem = $event['data'];
    this.newItem.value = this.newItem.selectedItem['name'];
  }

  deleteItem() {
    this.newItem.action = 'delete';
    this.newItem.main= this.activeItem;
    this.newItem.sub= this.activeSubItem;
    if(this.newItem.sub['type']==="StructuralUnit"){
      this.newItem.main['id']=this.newItem.sub['type'];
    }
    console.log(this.newItem);
    if(this.newItem.selectedItem !==undefined && this.newItem.selectedItem !== null){

      this.confirmationService.confirm({
        message: 'დარწმუნებული ხართ, რომ გსურთ წაშლა?',
        accept: () => {
          if(this.newItem.type ==='sub'){
            this.directoryService.deleteList("id="+this.newItem.selectedItem['id'])
              .then(response=>{
                this.getList(this.selectType);
                this.newItem.value = '';
              })
              .catch()
          }else {

            this.directoryService.postMainList(this.newItem.main['id'],this.newItem.action,"id="+this.newItem.selectedItem['id'])
              .then(response=>{

                if(this.newItem.sub['type']==="StructuralUnit"){
                  this.getStructuralUnitGrid('?');
                }else{
                  this.getMainList(this.newItem.main['id']);
                }
              })
              .catch(reason => {
                alert("წაშლა შეუძლებელია")
              })
          }

        }
      });
    }
  }


  nodeSelect($event: any) {
      console.log($event);
  }

  test(rowData) {
      console.log(rowData);
  }

  itemGroup(param: {action: string; type: string; data: any; }) {
    if(param.action === 'new'){
      this.newItem = {
        value: '',
        dialog: false,
        elective: [],
        consumption: [],
        isCar:[],
        isStrict:[]
      };
    }
    this.newItem.type = param.type;
    this.newItem.action = param.action;
    this.newItem.data = (typeof param.data === "object" && Object.entries(param.data).length===0)? undefined: param.data;
    this.newItem.consumption =[];
    this.newItem.elective =[];
    this.newItem.value ="";

    if(this.newItem.action ==='delete'){
        this.deleteUnitItem();
    }else if(this.newItem.action==='edit'){
      if(this.newItem.data ===undefined){
        return;
      }
      if(this.newItem.type==='ItemGroup'){
          this.newItem.elective = (this.newItem.data['selectable'] ===1) ? ['elective'] : [];
          this.newItem.consumption =  (this.newItem.data['spend'] ===1) ? ['consumption'] : [];
      }
        this.newItem.value = this.newItem.data['name'];
        this.newItem.measure_value = (this.newItem.data !== undefined && this.newItem.data['parent_name'] !=='' && this.newItem.data['measureValue']>0)? this.newItem.data['measureValue']: null;
    }else{
      this.newItem.measure_value = (this.newItem.data !== undefined && this.newItem.data['parent_name'] !=='' && this.newItem.data['measureValue']>0)? this.newItem.data['measureValue']: null;
    }
    this.newItem.dialog =(this.newItem.action !== 'delete');
  }

  private saveUnit() {
    console.log(this.newItem,(this.newItem.data === undefined));
    const parent = (this.newItem.data === undefined)? 0: this.newItem.data['id'];
    const measure_value =(this.newItem.data === undefined && this.newItem.measure_value === undefined ) ? "": "&measure_value="+ this.newItem.measure_value;
    const editMeasureValue =(this.newItem.data !== undefined && this.newItem.data['parent_name'] !=='' && this.newItem.data['measureValue']>0) ? "&measure_value="+this.newItem.measureValue: "" ;
    const params = (this.newItem.action ==='new')? "parent="+parent+"&name="+this.newItem.value+measure_value: "name="+this.newItem.value+editMeasureValue+"&id="+this.newItem.data['id'];


    this.directoryService.postMainList(this.newItem.type,this.newItem.action , params)
      .then(response=>{
        this.newItem.value = '';
        this.newItem.measure_value =null;
        this.newItem.dialog = false;
        this.getMeasureUnits();
      })
      .catch()
  }
  saveItemGroup() {
    console.log(this.newItem);
      const id = "&id="+((this.newItem.action ==='edit')? this.newItem.data['id']: null );
      const parent = (this.newItem.action !=='edit')?"&parent="+((this.newItem.data === undefined)? 0: this.newItem.data['id']):"";
      const params ="name="+this.newItem.value+"&selectable="+((this.newItem.elective.length===0)? 0: 1) +"&spend="+((this.newItem.consumption.length===0)? 0: 1)+"&isCar="+((this.newItem.isCar.length===0)? 0: 1)+"&isStrict="+((this.newItem.isStrict.length===0)? 0: 1) + parent+id;

      this.directoryService.postMainList(this.newItem.type,this.newItem.action , params)
        .then(response=>{
          this.newItem.value = '';
          this.newItem.elective =[];
          this.newItem.consumption =[];
          this.newItem.dialog = false;
          this.getItemGroup();
        })
        .catch()
  }


  deleteUnitItem() {
    console.log(this.newItem);
      this.confirmationService.confirm({
        message: 'დარწმუნებული ხართ, რომ გსურთ წაშლა?',
        accept: () => {
            this.directoryService.postMainList( this.newItem.type,this.newItem.action,"id="+this.newItem.data['id'])
              .then(response=>{
                this.getMeasureUnits();
                this.getItemGroup();
              })
              .catch()
        }
      });
  }
  if_error(data: Array<string>, field: string){
    return data.indexOf(field) >-1;
  }

  saveStructuralUnit() {
    console.log(this.newStructuralUnit);
    let filter = [
      'selectedCity',
      'selectedBuilding',
      'selectedDepartment',
      'selectedDivision',
      'selectedSection'
    ];

    this.formErrors =this.validator.checkObject(this.newStructuralUnit,filter);
    if(this.formErrors.length === 0) {
        let params = "";
        let i =1;
        filter.forEach(value => {
          params+=(("type"+i)+"="+this.newStructuralUnit[value]['id']+"&");
          i++;
        });
        if(this.newItem.action ==='edit'){
          params+=("id="+this.newItem.selectedItem['id']);
        }

        this.directoryService.postMainList('StructuralUnit', this.newItem.action,params)
          .then(response=>{
            this.getStructuralUnitGrid('?');
            this.newItem.structuralUnitDialog=false;
          }).catch(reason => {
            alert("დაფიქსირდა შეცდომა");
        })
    }
  }
  filterSuggestions($event: any, field: string) {
    console.log($event);
    switch (field) {
      case 'cities':
          this.filteredCities = ($event['query'].length >0)?this.cities.filter(value => {
            return value['name'].indexOf($event['query'])>-1
          }) : this.cities;
          return;
        break;
      case 'building':
        this.filteredCities = ($event['query'].length >0)?this.buildings.filter(value => {
          return value['name'].indexOf($event['query'])>-1
        }) : this.buildings;
        return;
        break;
      case 'department':
        this.filteredCities = ($event['query'].length >0)?this.departments.filter(value => {
          return value['name'].indexOf($event['query'])>-1
        }) : this.departments;
        return;
      break;
      case 'division':
          this.filteredCities = ($event['query'].length >0)?this.divisions.filter(value => {
            return value['name'].indexOf($event['query'])>-1
          }) : this.divisions;
          return;
      break;
      case 'section':
        this.filteredCities = ($event['query'].length >0)?this.sections.filter(value => {
          return value['name'].indexOf($event['query'])>-1
        }) : this.sections;
        return;
        break;
      default:
        break;
    }
    return   this.filteredCities = [];
  }

  addNewItem(number: number, value: any) {
     this.structuralUnit.dialog =true
      this.structuralUnit.value = value;
     this.structuralUnit.type=number;
     console.log(this.structuralUnit);
  }

  saveStructuralUnitItem() {
    const params = "parent=0&type="+this.structuralUnit.type+"&name="+this.structuralUnit.value;
      this.directoryService.postMainList('list','new',params)
        .then(response=>{
          this.getMainList(this.structuralUnit.type);
           this.structuralUnit.dialog=false;
           this.structuralUnit.value="";
          switch (this.structuralUnit.type) {
            case 1:
              this.newStructuralUnit.selectedCity=response['data'];
              break;
            case 2:
              this.newStructuralUnit.selectedBuilding=response['data'];
              break;
            case 3:
              this.newStructuralUnit.selectedDepartment=response['data'];
              break;
            case 4:
              this.newStructuralUnit.selectedDivision=response['data'];
              break;
            case 5:
              this.newStructuralUnit.selectedSection=response['data'];
              break;
            default: break;
          }
           this.structuralUnit.type=null;
        })
        .catch()
  }

  getPositionAndRoles(){
    this.directoryService.getRoles()
      .then(response=>{
        this.roles = response['data'].map(v=>{
          return {role: v['role'], name: v['name']};
        })
      })
      .catch()

    this.directoryService.getPositions(-1)
      .then(response=>{
        this.positions = response['data'];
      })
      .catch()
  }
  employee(param: { action: string; type: string }) {

    if(param.action ==="edit" && this.selectedEmployee !== null){

      this.directoryService.getEmployee(this.selectedEmployee['id'])
        .then(response=>{
          this.newEmployee={
            action: param.action,
            type: param.type,
            dialog: true,
            email: response['data']['email'],
            id:response['data']['id'],
            fname:response['data']['firstname'],
            lname:response['data']['lastname'],
            mobile:response['data']['mobile'],
            pin:response['data']['pid'],
            position:response['data']['position'],
            department: { id: response['data']['department']['id'] },
            role: { role: response['data']['role']['role'], name: response['data']['role']['name']},
            list: (response['data']['staffBuildings'].length > 0)? response['data']['staffBuildings'].map(v=>{
                return {
                  city:{ id: v['id'], name: v['parentName']},
                  building:{ id: v['buildingId'], name: v['name']}
                }
            }): []
          }
          this.getCities();
        })
        .catch()

    }else {
      this.newEmployee['action'] = param.action;
      this.newEmployee['type'] = param.type;

      if(this.selectedEmployeeNode ===undefined || this.selectedEmployeeNode['selectable'] !==1){
          return;
        }
      this.newEmployee.dialog=true;
    }
    this.getPositionAndRoles();
    console.log(this.selectedEmployee);
  }

  deleteEmployee() {
    this.confirmationService.confirm({
      message: 'დარწმუნებული ხართ, რომ გსურთ წაშლა?',
      accept: () => {
        this.directoryService.deleteEmployee(this.selectedEmployee['id'])
          .then(response=>{
            this.getEmployees();
            this.selectedEmployee =null;
          })
          .catch(()=>{
            alert("დაფიქსირდა შეცდომა")
          })
      }
    });

  }

  getCities() {
    if( this.newEmployee.role['role'] === "ROLE_PLACE" ){
      this.directoryService.getCities('')
        .then(value => {
          this.employeeCities = value['data'];
        })
        .catch()
    }
  }

  getBuildings() {
      this.directoryService.getBuildings(this.newEmployee.city['id'])
        .then(value => {
          this.employeeBuildings = value['data'];
        })
        .catch()
  }

  addCityByRole() {
      if(this.newEmployee.building && this.newEmployee.city){
        if(this.newEmployee.list.map(value => value['building']['id']).indexOf(this.newEmployee.building['id'])===-1){
          this.newEmployee.list.push({
            city:{ id: this.newEmployee.city['id'], name: this.newEmployee.city['name']},
            building:{ id: this.newEmployee.building['id'], name: this.newEmployee.building['name']}
          })
        }
      }
  }
  notNull(value){
    return (value !== undefined && value !== null);
  }
  saveNewEmployee() {
    let filter = [
      'fname'
    ];
    this.formErrors =this.validator.checkObject(this.newEmployee,filter);
    if(this.formErrors.length === 0) {
        let formData = new FormData();
        if(this.notNull(this.newEmployee.id)){
          formData.append("id", this.newEmployee.id.toString())
        }
        if(this.notNull(this.newEmployee.department)){
          formData.append("department", this.newEmployee.department['id'].toString())
        }
        if(this.notNull(this.newEmployee.fname)){
          formData.append("firstname", this.newEmployee.fname.toString())
        }
        if(this.notNull(this.newEmployee.lname)){
          formData.append("lastname", this.newEmployee.lname.toString())
        }
        if(this.notNull(this.newEmployee.email)){
          formData.append("email", this.newEmployee.email.toString())
        }
        if(this.notNull(this.newEmployee.mobile)){
          formData.append("mobile", this.newEmployee.mobile.toString())
        }
        if(this.notNull(this.newEmployee.pin)){
          formData.append("pid", this.newEmployee.pin.toString())
        }
        if(this.notNull(this.newEmployee.role)){
          formData.append("role", this.newEmployee.role['role'].toString())
        }
        if(this.notNull(this.newEmployee.position)){
          formData.append("position", this.newEmployee.position['id'])
        }
        if(this.notNull(this.newEmployee.list)){
          formData.append("buildings", this.newEmployee.list.map(value => value['building']['id']).toString())
        }

          this.directoryService.newEmployee(formData, this.newEmployee.action)
            .then(response=>{
              this.newEmployee ={
                dialog: false,
                role:{role:"", name:""},
                list: []
              }
              this.getEmployees();
            })
            .catch()

    }
  }


  onStructuralTreeTableSelect($event: any) {
      this.selectedEmp.selected = $event['data'];
      this.selectedStructuralUnitTree = $event['data'];
  }

  selected($event: any, level) {
    this.selectedItem[level]= $event;
  }
}
function parseTree(data: TreeNode[]): Array<TreeNode> {
  data.forEach( (value,index) => {
    data[index]['label']=value['text'];
    data[index]['key'] = value['id'];
    if(value.children !== undefined && value.children.length>0){
      parseTree(value.children);
    }
  });
  return data;
}


