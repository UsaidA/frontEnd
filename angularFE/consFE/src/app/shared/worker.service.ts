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
export class WorkerService {
  endpoint: string = rootUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getWorkersJobs() {
    let api = `${this.endpoint}/jobs/getWorkersJobs`;
    return this.http.get(api).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );
  }
  getDistance(origin: string[], destination: string){

    let originParam: string = "";
    for (let i = 0; i < origin.length; i ++){
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

  getTravelDetails(jobID: string){
    let api = `${this.endpoint}/travels/allTravelsForJob`;
    let params = {jobID: jobID}
    return this.http.get(api,{params}).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );
  }
  postTravelObj(workerID:string, jobID:string, distanceTravelled:string, dateTravelled:string) {
    console.log({jobID, workerID, distanceTravelled, dateTravelled });

    const Observable = this.http.post<any>(
      `${this.endpoint}/travels/postTravelObj`,
      {jobID,workerID, distanceTravelled, dateTravelled  }
    );
    return Observable;
  }

  getWorkersDetails() {
    let api = `${this.endpoint}/workers/getWorkerDetails`;
    return this.http.get(api).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );
  }
  getJobDetails(){
    let api = `${this.endpoint}/jobs/getWorkersJobs`;
    return this.http.get(api).pipe(
      map((res: any) => {
        return res || null;
      }),
      catchError(this.handleError)
    );
  }

  getImageKeysForJob(jobIDP: string){
    let api = `${this.endpoint}/images/allKeysFromJob`;
    let params = {jobID: jobIDP}
    return this.http.get(api,{params} ).pipe(
      
    );
  }

 

  uploadFile(file: File, job: Job) {
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('job',JSON.stringify(job))
    return this.http.post(rootUrl + '/images/postImage', formData).pipe(
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
