import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import { GeneratorComponent } from './generator/generator.component';

@NgModule({
  declarations: [CartComponent, GeneratorComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  exports:[
    CartComponent,
    GeneratorComponent
  ]
})
export class ComponentsModule { }
