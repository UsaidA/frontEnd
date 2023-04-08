import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagerWorkboardComponent } from './manager-workboard/manager-workboard.component';
import { LoginGuardGuard } from './login.guard';

const routes: Routes = [
{path: '', component: LoginComponent},
{path: 'login', component:LoginComponent},
{path: 'managerBoard', component:ManagerWorkboardComponent,canActivate: [LoginGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
      