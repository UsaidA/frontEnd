import { Injectable } from '@angular/core';

import { consCompanyHouseKey, rootUrl } from 'src/services/APIs';
import { allJobsKey, jwtTokenKey } from 'src/services/itemsKeys';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Job } from 'src/classes';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  endpoint: string = rootUrl;

  constructor(private http: HttpClient, public router: Router) {}


  getImageKeysForJob(jobIDP: string){
    let api = `${this.endpoint}/images/allKeysFromJob`;
    let params = {jobID: jobIDP}
    return this.http.get(api,{params} ).pipe(
      
    );
  }



  deleteImageFromJob(imageKey:string){
    let api = `${this.endpoint}/images/deleteImageFromJob`;
    let params = {imageKey: imageKey}

    return this.http.delete(api,{params} ).pipe(
      
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
