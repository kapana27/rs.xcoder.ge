import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {MessagesComponent} from './views/messages/messages.component';
import {ReportComponent} from './views/report/report.component';
import {DirectoryComponent} from './views/directory/directory.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'management',
    pathMatch: 'full',
  },

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'management',
        loadChildren: './views/management/management.module#ManagementModule'
      },
      {
        path: 'messages',
        component: MessagesComponent,
        data: {
          title: 'შეტყობინებები'
        }
      },
      {
        path: 'report',
        component: ReportComponent,
        data: {
          title: 'რეპორტი'
        }
      },
      {
        path: 'directory',
        component: DirectoryComponent,
        data: {
          title: 'ცნობარი'
        }
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
