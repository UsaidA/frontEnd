import { Component } from '@angular/core';
import { Job, Jwmapping, Worker } from '../../../classes';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ManagerService } from '../../shared/manager.service';
import { OnInit } from '@angular/core';
import { allWorkerKey } from 'src/services/itemsKeys';
import { KmConversionPipe } from 'src/app/shared/km-conversion.pipe';

@Component({
  selector: 'app-assign-workers-modal',
  templateUrl: './assign-workers-modal.component.html',
  styleUrls: ['./assign-workers-modal.component.scss']
})
export class AssignWorkersModalComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  AllWorkers: any[] = [];
  Job: any;
  jwmap: Jwmapping[] = [];
  highestPred:any;
  
  constructor(public modalRef: MdbModalRef<AssignWorkersModalComponent>, public managerService: ManagerService) {}

  ngOnInit(): void {
    // Call the method to set the highestPred variable
    this.updatePredictedSatisfaction(this.AllWorkers);
    this.findHighestPredictedSatisfactionWorker();
   
    
  }

  saveJob(workerID: any, jobID: any, job_typeID:any): void {
    const jwmap = new Jwmapping('',workerID, jobID, job_typeID,"0" ); //satsifaction starts at 0
    const JSONOBJ = JSON.stringify(jwmap);

    this.modalRef.close(JSONOBJ);

  }

  findHighestPredictedSatisfactionWorker() {
    this.highestPred = this.AllWorkers.reduce(
      (max, worker) =>
        worker.predictedSatisfaction > max.predictedSatisfaction ? worker : max,
      this.AllWorkers[0]
    );

    console.log(this.highestPred, "this is a tst of tets")
    console.log(this.AllWorkers)
  }
  scaleManagerRating(managerRating: number, distance: number): number {
    if (distance > 10000) {
      return 0;
    }

    const k = 2000; // midpoint of the sigmoid function
    const s = 500; // steepness of the sigmoid function
    const scale = 1 / (1 + Math.exp(-(distance - k) / s)); // calculate the scale factor using the sigmoid function
    return managerRating * scale; // scale down the manager rating
  }

  updatePredictedSatisfaction(allWorkers: any[]): void {
    allWorkers.forEach((worker) => {
    
      const distance = worker.distance;
      const predictedSatisfaction = worker.predictedSatisfaction;
      worker.predictedSatisfaction = this.scaleManagerRating(predictedSatisfaction, distance);
    });
  }




  
  checkVal(workerID: string, assigned: any){
    console.log(workerID, assigned);

    if (assigned === 'true') {
      console.log('before postJwmapping');

      this.managerService.postJwmapping(workerID, this.Job.jobID, this.Job.job_typeID).subscribe((message: any) => {

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
