import { Component } from '@angular/core';
import { Job, Jwmapping, Worker } from '../../classes';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ManagerService } from '../shared/manager.service';

@Component({
  selector: 'app-assign-workers-modal',
  templateUrl: './assign-workers-modal.component.html',
  styleUrls: ['./assign-workers-modal.component.scss']
})
export class AssignWorkersModalComponent {
  dtOptions: DataTables.Settings = {};
  AllWorkers: any[] = [];
  Job: any;
  jwmap: Jwmapping[] = [];
  
  constructor(public modalRef: MdbModalRef<AssignWorkersModalComponent>, public managerService: ManagerService) {}


  saveJob(workerID: any, jobID: any): void {
    const jwmap = new Jwmapping('',workerID, jobID);
    const JSONOBJ = JSON.stringify(jwmap);

    this.modalRef.close(JSONOBJ);
  }


  checkVal(workerID: string, assigned: any){
    console.log(workerID, assigned);

    if (assigned === 'true') {
      console.log('before postJwmapping');

      this.managerService.postJwmapping(workerID, this.Job.jobID).subscribe((message: any) => {

        console.log(message)
      })
      

    } else if (assigned === 'false') {
      console.log('before deleteJwmapping');
      this.managerService.deleteJwmapping(workerID, this.Job.jobID).subscribe((message: any) => {

        console.log(message, "delete subscribe")
      })
    }
    

    
  }


}
