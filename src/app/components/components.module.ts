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
import {ConfirmDialogModule, DialogModule, FileUploadModule, TreeTableModule} from 'primeng/primeng';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { AttachmentsComponent } from './attachments/attachments.component';

@NgModule({
  declarations: [CartComponent, GeneratorComponent,CartButtonComponent, TreeComponent, TreeTableComponent, FileUploaderComponent, AttachmentsComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    TreeModule,
    TreeTableModule,
    FileUploadModule,
    ConfirmDialogModule,
    DialogModule
  ],
  exports:[
    CartComponent,
    GeneratorComponent,
    CartButtonComponent,
    TreeComponent,
    TreeTableComponent,
    FileUploaderComponent,
    AttachmentsComponent
  ]
})
export class ComponentsModule { }
