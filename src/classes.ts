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
    constructor(public jobID: string, public name: string, public description: string, public completed: string, public address : string, public job_typeID :string){
        this.jobID = jobID;
        this.name = name;
        this.description = description
        this.address = address;
        this.completed = completed;
        this.job_typeID = job_typeID;
    }

}

class Jwmapping{
    constructor(public jwmappingID:string, public workerID: string, public jobID: string, public job_typeID: string, public satisfaction:string ){
        this.jwmappingID = jwmappingID;
        this.workerID = workerID;
        this.jobID = jobID;
        this.job_typeID = job_typeID;
        this.satisfaction = satisfaction
    }
}
class Travels{
    constructor(public travelID:string , public workerID: string, public jobID: string, public distanceTravelled: string, public dateTravelled: string){
        this.travelID = travelID;
        this.workerID = workerID;
        this.jobID = jobID;
        this.distanceTravelled = distanceTravelled;
        this.dateTravelled = dateTravelled;
    }

}

export{Registration,Worker, Job,Travels , Manager, Jwmapping};