import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutComponent } from './out/out.component';
import { InComponent } from './in/in.component';
import {DepartmentComponent} from "./department/department.component";
import {FinanceComponent} from "./finance/finance.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'დოკუმენტბრუნვა'
    },
    children: [
      {
        path: '',
        redirectTo: 'in'
      },
      {
        path: 'in',
        component: InComponent,
        data: {
          title: 'შემოსული'
        },
      },
      {
        path: 'out',
        component: OutComponent,
        data: {
          title: 'გასული'
        },
      },
      {
        path: 'department',
        component: DepartmentComponent,
        data: {
          title: 'დეპარტამენტი'
        },
      },
      {
        path: 'finance',
        component: FinanceComponent,
        data: {
          title: 'ფინანსები'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
