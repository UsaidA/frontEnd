
const APP_PREFIX = "my-app-";
export const allWorkerKey = APP_PREFIX + "allWorkers";
export const allJobsKey = APP_PREFIX + "allJobs";
export const jwtTokenKey = APP_PREFIX + "jwtToken";
export const registeredKey = APP_PREFIX + "registered"; 


import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  clearAppLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(APP_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  }
}