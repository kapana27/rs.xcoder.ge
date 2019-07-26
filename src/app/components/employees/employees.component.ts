import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {ConfirmationService, LazyLoadEvent} from "primeng/api";
import {Employee} from "../../models/employee";
import {ValidatorService} from "../../services/validator/validator.service";
import {Default} from "../../models/default";
import {DirectoryService} from "../../services/directory/directory.service";
declare var $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers:[ConfirmationService]

})
export class EmployeesComponent implements OnInit {

  dialogType: string = 'დამატება';
  @Input() disableClass: boolean = false;
  @Input() cols: any[] = [];
  @Input() changer: any;
  @Input() parent: any ;
  @Input() header: any = '&nbsp';
  @Input() additionButton: boolean = false;
  @Input() title: any = '&nbsp';
  @Input() filter: boolean = false;
  @Input() filterTitle: any = '';
  @Output() public onSelected = new EventEmitter();
  @Output() onAdditionAction  = new EventEmitter();
  @Input() enableActions: boolean = true;
  @Input() actions: {
    get?: string;
    insert?: string;
    update?: string;
    delete?: string;
  };
  event: any;
  selectedRow: any = '';
  data: any[];
  totalRecords: number;
  loading: boolean =false;
  filterValue: any = '';
  start: number = 0;
  limit: number = 100;
  newItemDialog: boolean = false;
  thisProperty: any;
  selectedRows: Array<any> =[];
  interval: any;
  newEmployee: Employee = {
    list: [],
    role:{role:"", name:""},
  };
  roles: Array<{role: string, name: string}> =[];
  positions: Array<{id: string, name: string}> =[];
  @Input() checkEditionStatus: boolean = false;
  @Input() selectedEmployeeNode: Default;

  employeeBuildings: Array<any> = [];
  employeeBuildingsAll: Array<any> = [];
  employeeCitiesAll: Array<any> = [];
  employeeSectionsAll: Array<any> = [];
  employeeCities: Array<any> = [];

  formErrors: Array<string> = [];
  constructor(private Request: RequestService,private confirmationService: ConfirmationService, private validator: ValidatorService, private directoryService: DirectoryService) {
    this.loading = true;
    this.thisProperty=this;

  }

  ngOnInit() {}

  loadLazy(event: LazyLoadEvent, param?: string) {
    this.event = this.notNull(event)? event: {first: 0, rows: 30};
    this.loading = true;
    const filtered = (this.filterValue)? "&name="+this.filterValue: "";
    const operator = (this.actions.get.indexOf("?") ===-1)? '?': '&';
    this.Request.Get(this.actions.get+operator+"start="+this.event['first']+"&limit="+this.event['rows']+filtered )
      .then(response=>{
        this.loading = false;
        this.data = response['data'];
        this.totalRecords = response['totalCount'];
      });
  }

  onRowSelect($event: any) {
    this.selectedRow= $event['data'];
    this.onSelected.emit($event['data']);
  }

  changeValue() {
    this.loadLazy(this.event)
  }

  onDelete() {
    if(this.notNull(this.selectedRow)){
      this.confirmationService.confirm({
        message: `დარწმუნებული ხართ, რომ გსურთ "${this.selectedRow['name']}"-ს  წაშლა?`,
        accept: () => {
          const operator = (this.actions.delete.indexOf("?") ===-1)? '?': '&';
          this.Request.Post(this.actions.delete+operator+"id="+this.selectedRow['id'])
            .then(response=>{
              this.loadLazy(this.event);
              this.selectedRow='';
            }).catch(reason => {
            alert(reason)
          })
        }
      })

    }
  }
  private notNull(value) {
    return (value !== undefined && value !== null && value !=='');
  }

  editItem() {
    if(this.notNull(this.selectedRow)) {
      if(!this.notNull(this.selectedRow['id'])){
        const operator = (this.actions.insert.indexOf("?") ===-1)? '?': '&';
        const parent = this.notNull(this.parent)? "&parent="+this.parent['id']: '';
        this.Request.Post(this.actions.insert+operator+"name="+this.selectedRow['name']+parent)
          .then(response=>{
            this.data.push(response['data']);
            this.totalRecords++;
            this.selectedRow='';
            this.newItemDialog = false;
          }).catch(reason => {
          alert(reason)
        })
      }else{
        const operator = (this.actions.update.indexOf("?") ===-1)? '?': '&';
        this.Request.Post(this.actions.update + operator + "id=" + this.selectedRow['id'] + "&name=" + this.selectedRow['name'])
          .then(response => {
            this.newItemDialog = false;
          }).catch(reason => {
          alert(reason)
        });
      }
    }
  }


  newItem() {
    this.getPositionAndRoles();
   this.newEmployee.dialog = true;
    this.changeZindex()

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadLazy(this.event);
    this.selectedRows = [];
    this.selectedRow = '';

  }


  onUnselect($event: any) {
  }

  edit() {
    this.dialogType = 'რედაქტირება';
    if(this.notNull(this.selectedRow)) {
      if (this.notNull(this.selectedRow['id'])) {
        this.newItemDialog = true;
        this.changeZindex()
      }
    }
  }

  addition() {
    if(this.notNull(this.selectedRow['id'])) {
      this.onAdditionAction.emit(this.selectedRow);
    }
  }

  changeZindex(){
    if(this.checkEditionStatus){
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        const children = $(".ui-widget-overlay");
        console.log("interval",children);
        if(children.length===2){
          console.log("clear",this.interval);
          $(children,children[0]).css("z-index",$(children,children[1]).css("z-index"))
          clearInterval(this.interval);
        }
      }, 100);
    }

  }

  if_error(data: Array<string>, field: string){
    return data.indexOf(field) >-1;
  }

  additionEmployee() {

  }
  getPositionAndRoles(){
    this.directoryService.getCities("")
      .then(value => {
        this.employeeCitiesAll = value['data'];
      })
      .catch()
    this.directoryService.getRoles()
      .then(response=>{
        this.roles = response['data'].map(v=>{
          return {role: v['role'], name: v['name']};
        })
      })
      .catch()

    this.directoryService.getPositions(this.selectedEmployeeNode['id'])
      .then(response=>{
        this.positions = response['data'];
      })
      .catch()
  }
  saveNewEmployee() {
    let filter = [
      'lastname',
      'role',
      'pid',
      'firstname',
      'buildingAll',
      'position',
      'email',
    ];
    this.formErrors =this.validator.checkObject(this.newEmployee,filter);
    if(this.formErrors.length === 0) {
      let formData = new FormData();
      if(this.notNull(this.newEmployee.id)){
        formData.append("id", this.newEmployee.id.toString())
      }
      if(this.notNull(this.newEmployee.department)){
        formData.append("department", this.selectedEmployeeNode['id'].toString())
      }
      if(this.notNull(this.newEmployee.firstname)){
        formData.append("firstname", this.newEmployee.firstname.toString())
      }
      if(this.notNull(this.newEmployee.lastname)){
        formData.append("lastname", this.newEmployee.lastname.toString())
      }
      if(this.notNull(this.newEmployee.email)){
        formData.append("email", this.newEmployee.email.toString())
      }
      if(this.notNull(this.newEmployee.mobile)){
        formData.append("mobile", this.newEmployee.mobile.toString())
      }
      if(this.notNull(this.newEmployee.pid)){
        formData.append("pid", this.newEmployee.pid.toString())
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
      if(this.notNull(this.newEmployee.sectionAll)){
        formData.append("section", this.newEmployee.sectionAll['id'].toString())
      }
      if(this.notNull(this.newEmployee.buildingAll)){
        formData.append("location", this.newEmployee.buildingAll['id'].toString())
      }

    }
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

  getCities() {
    if( this.newEmployee.role['role'] === "ROLE_PLACE" ){
      this.directoryService.getCities("")
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

  getBuildingsAll() {
    this.directoryService.getBuildings(this.newEmployee.cityAll['id'])
      .then(value => {
        this.employeeBuildingsAll = value['data'];
      })
      .catch()
  }

  getSectionsAll(){
    this.directoryService.getSections(this.newEmployee.buildingAll['id'])
      .then(value => {
        this.employeeSectionsAll = value['data'];
      })
      .catch()
  }
}

