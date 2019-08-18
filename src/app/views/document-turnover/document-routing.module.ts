import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutComponent } from './out/out.component';
import { InComponent } from './in/in.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
