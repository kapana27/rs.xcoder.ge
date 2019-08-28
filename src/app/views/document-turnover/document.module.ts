import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { OutComponent } from './out/out.component';
import { InComponent } from './in/in.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule, TreeTableModule} from 'primeng/primeng';
import {ComponentsModule} from "../../components/components.module";
import {FormsModule} from "@angular/forms";
import { GenerationComponent } from './generation/generation.component';
import { DepartmentComponent } from './department/department.component';
import { FinanceComponent } from './finance/finance.component';

@NgModule({
  declarations: [OutComponent, InComponent, GenerationComponent, DepartmentComponent, FinanceComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    AutoCompleteModule,
    DialogModule,
    InputTextareaModule,
    TreeTableModule,
    ComponentsModule,
    FormsModule
  ]
})
export class DocumentModule { }
