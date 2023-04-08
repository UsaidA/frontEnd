import { Injectable } from '@angular/core';

import { rootUrl } from 'src/services/APIs';
import { allJobsKey, jwtTokenKey } from 'src/services/itemsKeys';
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
export class ManagerService {
  endpoint: string = rootUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getJobs() {
    let api = `${this.endpoint}/jobs/getAllJobs`;
    return this.http.get(api).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );
  }

  getWorkers() {
    let api = `${this.endpoint}/workers/getAll`;
    return this.http.get(api).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );
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
    return throwError(() => msg);
  }
}
