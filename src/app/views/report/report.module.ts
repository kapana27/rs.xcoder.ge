import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportRoutingModule} from './report-routing.module';
import {TableModule} from 'primeng/table';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {AgGridModule} from 'ag-grid-angular';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PanelModule} from 'primeng/panel';
import {
  AutoCompleteModule,
  ButtonModule,
  CalendarModule, CheckboxModule, ChipsModule, ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  InputTextareaModule, SpinnerModule,
  TabMenuModule, TabViewModule, TreeModule, TreeTableModule, TriStateCheckboxModule
} from 'primeng/primeng';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { ReportComponentComponent } from './report-component/report-component.component';

@NgModule({
  declarations: [ReportComponentComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    TableModule,
    ScrollingModule,
    FontAwesomeModule,
    PanelModule,
    TabMenuModule,
    ButtonModule,
    DynamicDialogModule,
    DialogModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    InputTextareaModule,
    AutoCompleteModule,
    TabViewModule,
    SpinnerModule,
    CheckboxModule,
    TreeModule,
    AgGridModule.withComponents([]),
    ComponentsModule,
    ConfirmDialogModule,
    ChipsModule,
    TreeTableModule,
    NgbDatepickerModule
  ]
})
export class ReportModule { }
