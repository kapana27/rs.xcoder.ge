import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import { GeneratorComponent } from './generator/generator.component';
import {CartButtonComponent} from "./cart-button/cart-button.component";
import {FormsModule} from "@angular/forms";
import { TreeComponent } from './tree/tree.component';
import {TreeModule} from "primeng/tree";
import { TreeTableComponent } from './tree-table/tree-table.component';
import {
  CalendarModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  FileUploadModule,
  TooltipModule,
  TreeTableModule,
  AutoComplete,
  AutoCompleteModule, InputTextareaModule, SpinnerModule
} from 'primeng/primeng';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { MultipleTableComponent } from './multiple-table/multiple-table.component';
import { TableTreeComponent } from './table-tree/table-tree.component';
import { EmployeesComponent } from './employees/employees.component';
import { CustomDateComponent } from './custom-date/custom-date.component';
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { LanguageComponent } from './language/language.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { DocumentTurnOverDialogComponent } from './document-turn-over-dialog/document-turn-over-dialog.component';
import { ItemGroupComponent } from './item-group/item-group.component';
import { DocumentItemGroupComponent } from './document-item-group/document-item-group.component';
import { TableComponent } from './table/table.component';
import { DocumentTurnOverDisabledDialogComponent } from './document-turn-over-disabled-dialog/document-turn-over-disabled-dialog.component';
import { ErrorComponent } from './error/error.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { InventorIncomeDialogComponent } from './inventor/inventor-income-dialog/inventor-income-dialog.component';
import { InventorIncomeDialogFieldsComponent } from './inventor/inventor-income-dialog/inventor-income-dialog-fields/inventor-income-dialog-fields.component';

@NgModule({
  declarations: [
      CartComponent,
      GeneratorComponent,
      CartButtonComponent,
      TreeComponent,
      TreeTableComponent,
      FileUploaderComponent,
      AttachmentsComponent,
      MultipleTableComponent,
      TableTreeComponent,
      EmployeesComponent,
      CustomDateComponent,
      LanguageComponent,
      CustomInputComponent,
      DocumentTurnOverDialogComponent,
      ItemGroupComponent,
      DocumentItemGroupComponent,
      TableComponent,
      DocumentTurnOverDisabledDialogComponent,
      ErrorComponent,
      ReportTableComponent,
      InventorIncomeDialogComponent,
      InventorIncomeDialogFieldsComponent
      ],
  imports: [
    DropdownModule,
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    TreeModule,
    TreeTableModule,
    FileUploadModule,
    ConfirmDialogModule,
    DialogModule,
    TooltipModule,
    CalendarModule,
    NgbDatepickerModule,
    AutoCompleteModule,
    InputTextareaModule,
    SpinnerModule
  ],
  exports: [
    CartComponent,
    GeneratorComponent,
    CartButtonComponent,
    TreeComponent,
    TreeTableComponent,
    FileUploaderComponent,
    AttachmentsComponent,
    MultipleTableComponent,
    TableTreeComponent,
    EmployeesComponent,
    CustomDateComponent,
    LanguageComponent,
    CustomInputComponent,
    ItemGroupComponent,
    DocumentItemGroupComponent,
    DocumentTurnOverDialogComponent,
    TableComponent,
    DocumentTurnOverDisabledDialogComponent,
    ReportTableComponent,
    InventorIncomeDialogComponent,
    InventorIncomeDialogFieldsComponent
  ],
  entryComponents: [
    CustomDateComponent,
    DocumentTurnOverDialogComponent
  ]
})
export class ComponentsModule { }
