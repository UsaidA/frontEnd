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
import { Job } from 'src/classes';

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
    console.log({ name, description, completed, address })

    const Observable = this.http.post<any>(
      `${this.endpoint}/jobs/createNewJob`,
      { name, description, completed, address }
    );
    return Observable;
  }

  postJwmapping(
    workerID:string, 
    jobID: string
  ) {
    console.log({workerID, jobID })

    const Observable = this.http.post<any>(
      `${this.endpoint}/jobs/createNewJob`,
      { workerID, jobID }
    );
    return Observable;
  }


  getJobAssigns(){
    let api = `${this.endpoint}/jwmapping/getAllJwmapping`;
    return this.http.get(api).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );
  }

  getWorkersFromJob(jobID: any){
    let api = `${this.endpoint}/jwmapping/getAllWorkersFromJob`;
    let params = {jobID: jobID}
    return this.http.get(api,{params}).pipe(
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
