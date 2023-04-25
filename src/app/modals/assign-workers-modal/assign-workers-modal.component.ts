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
  scaleManagerRating(managerRating: number, scalingFactor: number): number {
    return managerRating * scalingFactor;
  }

  updatePredictedSatisfaction(allWorkers: any[]): void {
    const minDistance = allWorkers.reduce((min, worker) => Math.min(min, worker.distance), Infinity);
    const penaltyThreshold = 2000;

    allWorkers.forEach((worker) => {
      const distance = worker.distance;
      const predictedSatisfaction = worker.predictedSatisfaction;
      const distanceDifference = distance - minDistance;
      let scalingFactor = 1;

      if (distanceDifference > 0 && distanceDifference <= penaltyThreshold) {
        scalingFactor = 1 - distanceDifference / penaltyThreshold;
      } else if (distanceDifference > penaltyThreshold) {
        scalingFactor = 0;
      }

      worker.predictedSatisfaction = this.scaleManagerRating(predictedSatisfaction, scalingFactor);
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
