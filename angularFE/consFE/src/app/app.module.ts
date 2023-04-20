import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { ManagerWorkboardComponent } from './manager-workboard/manager-workboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { CreateJobModalComponent } from './modals/create-job-modal/modal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { WorkerWorkboardComponent } from './worker-workboard/worker-workboard.component';
import { WorkerModalComponent } from './modals/worker-modal/worker-modal.component';
import { AssignWorkersModalComponent } from './modals/assign-workers-modal/assign-workers-modal.component';
import { CreateWorkerModalComponent } from './modals/create-worker-modal/create-worker-modal.component';
import { TravelModalComponent } from './modals/travel-modal/travel-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    ManagerWorkboardComponent,
    CreateJobModalComponent,
    WorkerWorkboardComponent,
    WorkerModalComponent,
    AssignWorkersModalComponent,
    CreateJobModalComponent,
    TravelModalComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      
    },
    MdbModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
