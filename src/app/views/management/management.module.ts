import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyComponent } from './property/property.component';
import {ManagementRoutingModule} from './management-routing.module';
import { WarehouseComponent } from './warehouse/warehouse.component';
import {TableModule} from 'primeng/table';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {AgGridModule} from "ag-grid-angular";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PanelModule} from "primeng/panel";
import {
  AutoCompleteModule,
  ButtonModule,
  CalendarModule, CheckboxModule, ChipsModule, ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  InputTextareaModule, SpinnerModule,
  TabMenuModule, TabViewModule, TreeModule, TreeTableModule, TriStateCheckboxModule
} from 'primeng/primeng';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [PropertyComponent, WarehouseComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
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
    TreeTableModule
  ]
})
export class ManagementModule { }
