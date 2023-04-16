import { Injectable } from '@angular/core';

import { consCompanyHouseKey, googleMatrixApiKey, rootUrl } from 'src/services/APIs';
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
import axios from 'axios';

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

  postJob(
    name: string,
    description: string,
    completed: string,
    address: string
  ) {
    console.log({ name, description, completed, address });

    const Observable = this.http.post<any>(
      `${this.endpoint}/jobs/createNewJob`,
      { name, description, completed, address }
    );
    return Observable;
  }

  postJwmapping(workerID: string, jobID: string) {
    console.log({ workerID, jobID });

    const Observable = this.http.post<any>(
      `${this.endpoint}/jwmapping/postAssign`,
      { workerID, jobID }
    );
    return Observable;
  }

  deleteJwmapping(workerID: string, jobID: string) {
    console.log({ workerID, jobID });
    let params = {
      jobID: jobID,
      workerID: workerID,
    };
    const Observable = this.http.delete<any>(
      `${this.endpoint}/jwmapping/deleteAssign`,
      { params }
    );
    return Observable;
  }

  getDistance(origin: string[], destination: string){

    let originParam: string = "";
    for (let i = 0; i < destination.length; i ++){
      originParam = originParam +"|"+ origin[i]

    }
    let api = `${this.endpoint}/getDistance`;
    let params = { origins: originParam, destinations: destination};
    return this.http.get(api, { params }).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );

  }
  
  isValidPostcode(postcode:string){
    let api = `${this.endpoint}/distanceMatrix`;
    let params = { 
      origins: "bb101pr",
      destinations: postcode,
    };
    return this.http.get(api,{params}).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );
  }

  getJobAssigns() {
    let api = `${this.endpoint}/jwmapping/getAllJwmapping`;
    return this.http.get(api).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );
  }

  getWorkersFromJob(jobID: any) {
    let api = `${this.endpoint}/jwmapping/getAllWorkersFromJob`;
    let params = { jobID: jobID };
    return this.http.get(api, { params }).pipe(
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
