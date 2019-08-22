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
import {InputTextareaModule} from 'primeng/primeng';

@NgModule({
  declarations: [OutComponent, InComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    AutoCompleteModule,
    DialogModule,
    InputTextareaModule
  ]
}) 
export class DocumentModule { }
