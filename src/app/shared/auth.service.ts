import { Injectable } from '@angular/core';

import { rootUrl } from 'src/services/APIs';
import { accessControlKey, jwtTokenKey } from 'src/services/itemsKeys';
import { Observable, of, throwError } from 'rxjs';
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
    const Observable = this.http.post<any>(`${this.endpoint}/login`, {
      email,
      password,
    });

    Observable.subscribe((res: any) => {
      // subscribe is the fullfillment of the promise
      if (res?.accessToken) {
        localStorage.setItem(jwtTokenKey, res.accessToken);
        localStorage.setItem(accessControlKey, res.accessControl);
      }
    });
    return Observable;
  }
  register(email: string, password: string) {
    return this.http.post<any>(`${this.endpoint}/register`, {
      email,
      password,
    }).pipe(
      map((res: any) => {
        console.log(res);
        return res || null;
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getToken() {
    return localStorage.getItem(jwtTokenKey);
  }

  get isLoggedIn(): Observable<boolean> {
    return new Observable(observer => {
      let authToken = localStorage.getItem(jwtTokenKey);
      let accessControl = localStorage.getItem(accessControlKey);
      if (authToken !== null && accessControl === '1') {
        observer.next(true);
        observer.complete();
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  get isWorkerLoggedIn(): boolean {
    let authToken = localStorage.getItem(jwtTokenKey);

    if (authToken !== null) {
      return true;
    } else {
      return false;
    }
  }
  doLogout() {
    let removeToken = localStorage.removeItem(jwtTokenKey);
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
     
    }
    return throwError(()=>error);
  }
}
