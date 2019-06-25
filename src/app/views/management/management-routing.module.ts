import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PropertyComponent} from './property/property.component';
import {WarehouseComponent} from './warehouse/warehouse.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ოპერაციები'
    },
    children: [
      {
        path: '',
        redirectTo: 'property'
      },
      {
        path: 'property',
        component: PropertyComponent,
        data: {
          title: 'ქონების მართვა'
        },
      },
      {
        path: 'warehouse',
        component: WarehouseComponent,
        data: {
          title: 'საწყობის მართვა'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
