import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Job, Jwmapping, Worker } from '../../classes';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { allJobsKey, allWorkerKey, jwtTokenKey } from 'src/services/itemsKeys';
import { sendJobData } from 'src/services/services';
import { ManagerService } from '../shared/manager.service';
import { AuthService } from '../shared/auth.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { AssignWorkersModalComponent } from '../assign-workers-modal/assign-workers-modal.component';

@Component({
  selector: 'app-manager-workboard',
  templateUrl: './manager-workboard.component.html',
  styleUrls: ['./manager-workboard.component.scss'],
})
export class ManagerWorkboardComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  modalRef: MdbModalRef<ModalComponent> | null = null;
  firstName = '';
  lastName = '';
  email = '';

  temp = '';

  public jData: Job[] = [];
  public workerData: Worker[] = [];

  dtOptions: DataTables.Settings = {};
  dtElement: any;
  constructor(
    private router: Router,
    private managerService: ManagerService,
    private authService: AuthService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getJobData();
    this.getWorkerData();
    //this.managerService.getDistance();
    // add the worker and job services here

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 15, 25],
      processing: true,
    };
  }

  getJobData() {
    this.managerService.getJobs().subscribe((jobs: any) => {
      //use method when promise resolved
      this.jData = jobs ?? [];
      //this.rerender();
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(void 0);
    });
  }

  getWorkerData() {
    this.managerService.getWorkers().subscribe((workers: any) => {
      //use method when promise resolved

      this.workerData = workers ?? []; // if workers is null or undefined,  assign []
    });
  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { title: 'Job Details' },
    });

    this.modalRef.onClose.subscribe((message: any) => {
      if (message) {
        
        var x: Job = JSON.parse(message);

        this.managerService
          .postJob(x.name, x.description, x.completed, x.address)
          .subscribe((res: any) => {
            this.getJobData();
          });
      } else {
        
      }
    });
  }
  openAssignModal(jobData: Job) {
    // the job parameter is passed upon modals creation in the datatable, the 'job' is passed in that moment
    this.getWorkerDataFromJob(jobData.jobID).subscribe((workerIdList: string[]) => {
   
      let temp:any = [...this.workerData];
      for(let i =0; i < temp.length; i++){ // new temp obj array, which extends workers but has an assigned property to tell the created modal which workers are already assinged to that job
        temp[i].assigned = 0;
        
        for(let x = 0; x < workerIdList.length; x++){
          if(temp[i].workerID  == workerIdList[x]){
            temp[i].assigned = 1;
          }
        }
      }

      
      const modalOptions = {
        modalClass: 'modal-dialog modal-xl',
        data: {
          Job: jobData,
          AllWorkers: temp
        },
      };

      this.modalRef = this.modalService.open(
        AssignWorkersModalComponent,
        modalOptions
      );


      this.modalRef.onClose.subscribe((message: any) => {
        if (message) {
        
          var x: Jwmapping = JSON.parse(message);
  
          this.managerService
            .postJwmapping(x.workerID, x.jobID)
            
        } else {
          
        }
      });


    });
  }

  getWorkerDataFromJob(jobID: string): Observable<any> {
    return this.managerService.getWorkersFromJob(jobID).pipe(
      map((workers: any) => {
       
        let workersIdList = new Array<string>(workers.length);
        for (let i = 0; i < workers.length; i++) {
          workersIdList[i] = workers[i].workerID;
        }
       
        return workersIdList;
      }),
      catchError((val) => of(`I caught: ${val}`))
    );
  }

  LogOut() {
    this.authService.doLogout();
  }

  ngOndestroy() {
    console.log('Manager dashbaord destroyed');
  }
}
