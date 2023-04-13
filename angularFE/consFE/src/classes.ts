import { jwtTokenKey } from "./services/itemsKeys";
class Registration{
    constructor(public email: string, public password: string){
        this.email = email;
        this.password =password;
    }
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


class Job{
    constructor(public jobID: string, public name: string, public description: string, public completed: string, public address : string){
        this.jobID = jobID;
        this.name = name;
        this.description = description
        this.address = address;
        this.completed = completed;
    }

}

class Jwmapping{
    constructor(public jwmappingID:string, public workerID: string, public jobID: string ){
        this.jwmappingID = jwmappingID;
        this.workerID = workerID;
        this.jobID = jobID
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

export{Registration,Worker, Job,Travels , Manager, Jwmapping};