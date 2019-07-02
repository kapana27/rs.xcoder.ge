import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import { GeneratorComponent } from './generator/generator.component';
import {CartButtonComponent} from "./cart-button/cart-button.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [CartComponent, GeneratorComponent,CartButtonComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule
  ],
  exports:[
    CartComponent,
    GeneratorComponent,
    CartButtonComponent
  ]
})
export class ComponentsModule { }
