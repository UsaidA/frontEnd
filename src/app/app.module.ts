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
import { CreateJobModalComponent } from './modals/create-job-modal/create-job-modal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { WorkerWorkboardComponent } from './worker-workboard/worker-workboard.component';
import { viewJobImagesModalComponent } from './modals/images-modal/images-modal.component';
import { AssignWorkersModalComponent } from './modals/assign-workers-modal/assign-workers-modal.component';
import { CreateWorkerModalComponent } from './modals/create-worker-modal/create-worker-modal.component';
import { TravelModalComponent } from './modals/travel-modal/travel-modal.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KmConversionPipe } from './shared/km-conversion.pipe';
import { WorkerDropdownComponent } from './worker-workboard/worker-dropdown/worker-dropdown.component';
import { RegisterComponent } from './register/register.component';
import { ManagerDropdownComponent } from './manager-workboard/manager-dropdown/manager-dropdown.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ManagerReviewComponent } from './manager-review/manager-review.component';
import { BinaryPipe } from './shared/binary.pipe';
import { ManagerReviewModalComponent } from './modals/manager-review-modal/manager-review-modal.component';

//import { WorkerDropdownComponent_1 as WorkerDropdownComponent } from "./worker-workboard/worker-dropdown/worker-dropdown.component";
@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        LoginComponent,
        ManagerWorkboardComponent,
        CreateJobModalComponent,
        WorkerWorkboardComponent,
        viewJobImagesModalComponent,
        AssignWorkersModalComponent,
        CreateJobModalComponent,
        TravelModalComponent,
        KmConversionPipe,
        RegisterComponent,
        ManagerReviewComponent,
        BinaryPipe,
        ManagerReviewModalComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        MdbModalService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        DataTablesModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        CarouselModule,
        BrowserAnimationsModule,
        WorkerDropdownComponent,
        ManagerDropdownComponent,
        MatSidenavModule,
        MatButtonModule,
    ]
})
export class AppModule { }
