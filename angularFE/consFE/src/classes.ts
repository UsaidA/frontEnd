import { jwtTokenKey } from "./services/itemsKeys";
class Registration{
    constructor(public email: string, public password: string){
        this.email = email;
        this.password =password;
    }

    /*
    login(registered: Registration, token: string){
        const temp = JSON.stringify(registered)

        localStorage.setItem('registered', temp)
        localStorage.setItem('token', token)

    }
    
    isLoggedIn(): boolean{

        if(localStorage.getItem('token') === null){
            return false
        }else{
            return true;
        }


    }

    */
}

class Worker{

    constructor(public workerID: string, public firstName: string, public lastName:string, public email: string, public address: string ){
        this.workerID = workerID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address= address;
        this.email = email;
    }
}

class Manager{

    constructor(public managerID: string, public firstName: string, public lastName:string, public email: string){
        this.managerID = managerID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
       
    }
}

class singletonAuth {
  private static _instance: singletonAuth | null = null;

  private constructor() {
    //localStorage.setItem(jwtToken, token);
  }

  public setToken(token: string) {
    localStorage.setItem(jwtTokenKey, token);
  }
  public static getInstance():singletonAuth {
    if (!singletonAuth._instance) {
      console.log(' woof woof');
      singletonAuth._instance = new singletonAuth();
    }
    return singletonAuth._instance;
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem(jwtTokenKey);
    console.log(token, 'auth auth ');
    // Check if the token is truthy (i.e., not null, undefined, or false)
    if (token) {
      // Token exists in LocalStorage, so return true
      return true;
    } else {
      // Token does not exist in LocalStorage, so return false
      return false;
    }
  }
  static logOut() {
    this._instance = null;
    localStorage.clear();
  }
}

class Job{
    constructor(public jobID: string, public name: string, public description: String, public completed: string, public address : string){
        this.jobID = jobID;
        this.name = name;
        this.description = description
        this.address = address;
        this.completed = completed;
    }

}
class Travels{
    constructor(public travelID:string , public workerID: string, public startPoint: string, public endPoint:string, public distanceTravelled: string){
        this.travelID = travelID;
        this.workerID = workerID;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.distanceTravelled = distanceTravelled;
    }

}

export{Registration,Worker, singletonAuth,  Job,Travels , Manager};