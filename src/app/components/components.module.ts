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

@NgModule({
  declarations: [CartComponent, GeneratorComponent,CartButtonComponent, TreeComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    TreeModule
  ],
  exports:[
    CartComponent,
    GeneratorComponent,
    CartButtonComponent,
    TreeComponent
  ]
})
export class ComponentsModule { }
