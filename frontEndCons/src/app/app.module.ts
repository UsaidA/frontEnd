import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerWorkboardComponent } from './manager-workboard/manager-workboard.component';
import { LoginComponent } from './login/login.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DataTablesModule } from 'angular-datatables';
import {WorkComponent} from './manager-workboard/work.component'
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ContainerService } from 'angular-slickgrid';
import { MyComponent } from './slick-grid/slick-grid.component';
import { AngularSlickgridModule } from 'angular-slickgrid';

@NgModule({
    declarations: [
        AppComponent,
        ManagerWorkboardComponent,
        LoginComponent,
        TopBarComponent,
        WorkComponent,
        MyComponent,
    ],
    providers: [
        ContainerService,
    ],
    bootstrap: [AppComponent],
    imports: [
        AgGridModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule,
        HttpClientModule,
        AngularSlickgridModule
    ]
})
export class AppModule { }
