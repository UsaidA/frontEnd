import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginWorkerGuard  {
  constructor(private authService: AuthService, private router: Router){
    
  }
   

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isWorkerLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return this.authService.isWorkerLoggedIn;
  }


  
}
