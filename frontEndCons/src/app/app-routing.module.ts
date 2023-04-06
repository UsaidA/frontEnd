import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagerWorkboardComponent } from './manager-workboard/manager-workboard.component';
import { LoginGuardGuard } from './login.guard';
import { MyComponent } from './slick-grid/slick-grid.component';

const routes: Routes = [
{path: '', component: LoginComponent},
{path: 'login', component:LoginComponent},
{path: 'managerBoard', component:ManagerWorkboardComponent,canActivate: [LoginGuardGuard]},
{path: 'test', component:MyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

