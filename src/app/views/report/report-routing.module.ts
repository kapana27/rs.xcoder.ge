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
        redirectTo: 'employee'
      },
      {
        path: 'warehouse',
        component: ReportComponentComponent,
        data: {
          title: 'საწყობის მართვა'
        },
      },
      {
        path: 'property',
        component: ReportComponentComponent,
        data: {
          title: 'ქონების მართვა'
        },
      },
      {
        path: 'employee',
        component: ReportComponentComponent,
        data: {
          title: 'თანამშრომლები'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
