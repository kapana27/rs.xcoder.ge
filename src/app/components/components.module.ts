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
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  FileUploadModule,
  TooltipModule,
  TreeTableModule
} from 'primeng/primeng';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { MultipleTableComponent } from './multiple-table/multiple-table.component';
import { TableTreeComponent } from './table-tree/table-tree.component';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [CartComponent, GeneratorComponent,CartButtonComponent, TreeComponent, TreeTableComponent, FileUploaderComponent, AttachmentsComponent, MultipleTableComponent, TableTreeComponent, EmployeesComponent],
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
    TooltipModule
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
    EmployeesComponent
  ]
})
export class ComponentsModule { }
