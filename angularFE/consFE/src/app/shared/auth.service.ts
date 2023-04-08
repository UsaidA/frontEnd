import { Injectable } from '@angular/core';

import { rootUrl } from 'src/services/APIs';
import { jwtTokenKey } from 'src/services/itemsKeys';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = rootUrl;

  constructor(private http: HttpClient, public router: Router) {}

  signIn(email: string, password: string) {

    const Observable =  this.http
      .post<any>(`${this.endpoint}/login`, { email, password })
    
    Observable.subscribe((res: any) => { // subscribe is the fullfillment of the promise
        if (res?.accessToken) {
          localStorage.setItem(jwtTokenKey, res.accessToken);
        }
      });
      return Observable;
  }
  getToken() {
    return localStorage.getItem(jwtTokenKey);
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(jwtTokenKey);
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem(jwtTokenKey);
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
}
