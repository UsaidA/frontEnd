import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './shared/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard  {
  constructor(private authService: AuthService, private router: Router){
    
  }
   

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    
    return this.authService.isLoggedIn.pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['login']);
          return false;
        }else{
          
          return true;
        }
        
      })
    );

  }


  
}
