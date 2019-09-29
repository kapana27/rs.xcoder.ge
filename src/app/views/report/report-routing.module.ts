import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ReportComponentComponent} from './report-component/report-component.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ოპერაციები'
    },
    children: [
      {
        path: '',
        redirectTo: 'invoice'
      },
      {
        path: 'invoice',
        component: ReportComponentComponent
      },
      {
        path: 'documentTurnover',
        component: ReportComponentComponent
      },
      {
        path: 'inventory',
        component: ReportComponentComponent
      },{
        path: 'leadership',
        component: ReportComponentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
