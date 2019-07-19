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
import {TreeTableModule} from "primeng/primeng";

@NgModule({
  declarations: [CartComponent, GeneratorComponent,CartButtonComponent, TreeComponent, TreeTableComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    TreeModule,
    TreeTableModule
  ],
  exports:[
    CartComponent,
    GeneratorComponent,
    CartButtonComponent,
    TreeComponent,
    TreeTableComponent
  ]
})
export class ComponentsModule { }
