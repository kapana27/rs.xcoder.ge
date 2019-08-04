import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ManagementComponent } from './views/management/management.component';
import { MessagesComponent } from './views/messages/messages.component';
import { DirectoryComponent } from './views/directory/directory.component';
import { ReportComponent } from './views/report/report.component';
import {HttpClientModule} from "@angular/common/http";
import {AgGridModule} from "ag-grid-angular";
import {TableModule} from "primeng/table";
import {
  AutoCompleteModule,
  CheckboxModule,
  ConfirmDialogModule, DialogModule,
  PaginatorModule,
  TabMenuModule,
  TabViewModule,
  TooltipModule,
  TreeTableModule
} from "primeng/primeng";
import {ComponentsModule} from "./components/components.module";
import { IncameOperationComponent } from './views/incame-operation/incame-operation.component';
import { TestComponent } from './views/test/test.component';
import { Test1Component } from './views/test1/test1.component';
import {NgbDatepickerModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TableModule,
    AgGridModule.withComponents([]),
    ChartsModule,
    TabMenuModule,
    ConfirmDialogModule,
    PaginatorModule,
    TooltipModule,
    TabViewModule,
    ComponentsModule,
    TreeTableModule,
    CheckboxModule,
    DialogModule,
    AutoCompleteModule,
    NgbModule,
    NgbDatepickerModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ManagementComponent,
    MessagesComponent,
    DirectoryComponent,
    ReportComponent,
    IncameOperationComponent,
    TestComponent,
    Test1Component,
  ],
  exports:[
    TestComponent,
    Test1Component,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
