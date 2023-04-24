import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagerWorkboardComponent } from './manager-workboard/manager-workboard.component';
import { LoginGuardGuard } from './login.guard';
import { WorkerWorkboardComponent } from './worker-workboard/worker-workboard.component';
import { LoginWorkerGuard } from './loginWorker.guard';
import { RegisterComponent } from './register/register.component';
import { ManagerReviewComponent } from './manager-review/manager-review.component';

const routes: Routes = [
{path: '', component: LoginComponent},
{path: 'login', component:LoginComponent},
{path:'register', component:RegisterComponent},
{path: 'managerBoard', component:ManagerWorkboardComponent,canActivate: [LoginGuardGuard]},
{path:'workerBoard', component:WorkerWorkboardComponent, canActivate:[LoginWorkerGuard]},
{path: 'managerReview', component: ManagerReviewComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
      