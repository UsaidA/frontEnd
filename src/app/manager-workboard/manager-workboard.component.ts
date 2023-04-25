

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Job, Jwmapping, Travels, Worker } from '../../classes';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { allJobsKey, allWorkerKey, jwtTokenKey } from 'src/services/itemsKeys';
import { sendJobData } from 'src/services/services';
import { ManagerService } from '../shared/manager.service';
import { AuthService } from '../shared/auth.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CreateJobModalComponent } from '../modals/create-job-modal/create-job-modal.component';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { AssignWorkersModalComponent } from '../modals/assign-workers-modal/assign-workers-modal.component';
import { CreateWorkerModalComponent } from '../modals/create-worker-modal/create-worker-modal.component';
import { TravelModalComponent } from '../modals/travel-modal/travel-modal.component';
import { CommonService } from '../shared/common.service';
import { viewJobImagesModalComponent } from '../modals/images-modal/images-modal.component';

@Component({
  selector: 'app-manager-workboard',
  templateUrl: './manager-workboard.component.html',
  styleUrls: ['./manager-workboard.component.scss'],
})
export class ManagerWorkboardComponent implements OnInit {
  opened = true;

  toggleSidebar() {
    this.opened = !this.opened;
  }
  dtTrigger: Subject<any> = new Subject();
  modalRef: MdbModalRef<CreateJobModalComponent> | null = null;
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
    private commonService: CommonService,
    private authService: AuthService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getJobData();
    this.getWorkerData();
   

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
  getImageKeysFromJob(jobID: string): Observable<any> {
    return this.commonService.getImageKeysForJob(jobID).pipe(
      map((keys: any) => {
        let keysList = new Array<string>(keys.length);
        for (let i = 0; i < keys.length; i++) {
          keysList[i] =
            'http://localhost:8888/api/images/images/' + keys[i].image_key;
        }
        console.log(keysList);
        return keysList;
      }),
      catchError((val) => of(`I caught: ${val}`))
    );
  }
  openImagesModal(jobData: Job) {
    this.getImageKeysFromJob(jobData.jobID).subscribe((keyList: string[]) => {
      console.log(keyList);
      const modalOptions = {
        modalClass: 'modal-xl',
        data: {
          Job: jobData,
          imageList: keyList,
        },
      };

      console.log('this should be second to keys');
      this.modalRef = this.modalService.open(
        viewJobImagesModalComponent,
        modalOptions
      );
    });
  }

  openJobCreationModal() {
    this.managerService.getJobTypes().subscribe((types: any) => {
      console.log(types);

      const modalOptions = {
        modalClass: 'modal-dialog modal-xl',
        data: {
          jobTypes: types,
        },
      };

      this.modalRef = this.modalService.open(
        CreateJobModalComponent,
        modalOptions
      );

      this.modalRef.onClose.subscribe((message: any) => {
        if (message) {
          var x: Job = JSON.parse(message);
          this.managerService
            .postJob(
              x.name,
              x.description,
              x.completed,
              x.address,
              x.job_typeID
            )
            .subscribe((res: any) => {
              this.getJobData();
            });
        } else {
        }
      });
    });
  }
  openJobUpdateModal(job: Job) {
    this.managerService.getJobTypes().subscribe((types: any) => {
      const modalOptions = {
        modalClass: 'modal-dialog modal-xl',
        data: {
          job: job,
          openType: 'update',
          jobTypes: types,
        },
      };
      this.modalRef = this.modalService.open(
        CreateJobModalComponent,
        modalOptions
      );

      this.modalRef.onClose.subscribe((message: any) => {
        if (message) {
          var x: Job = JSON.parse(message);
          this.managerService
            .updateJob(
              x.jobID,
              x.name,
              x.description,
              x.completed,
              x.address,
              x.job_typeID
            )
            .subscribe((res: any) => {
              this.getJobData();
            });
        } else {
        }
      });
    });
  }
  openWorkerCreationModal() {
    this.modalRef = this.modalService.open(CreateWorkerModalComponent);

    this.modalRef.onClose.subscribe((worker: any) => {
      if (worker) {
        var x: Worker = JSON.parse(worker);

        this.managerService
          .postWorker(x.firstName, x.lastName, x.address, x.email) /// change to postWOrker
          .subscribe((res: any) => {
            this.getWorkerData();
          });
      } else {
      }
    });
  }
  openWorkerUpdateModal(worker: Worker) {
    console.log("this isn't a test");
    const modalOptions = {
      modalClass: 'modal-dialog modal-xl',
      data: {
        worker: worker,
        openType: 'update',
      },
    };
    this.modalRef = this.modalService.open(
      CreateWorkerModalComponent,
      modalOptions
    );

    this.modalRef.onClose.subscribe((worker: any) => {
      if (worker) {
        var x: Worker = JSON.parse(worker);

        this.managerService
          .updateWorker(x.workerID, x.firstName, x.lastName, x.address, x.email)
          .subscribe((res: any) => {
            this.getWorkerData();
          });
      } else {
      }
    });
  }

  openWorkersTravelHistoryModal(workerID: string) {
    this.managerService
      .getWorkerTravelHistory(workerID)
      .subscribe((res: any) => {
        if (res[0]) {
          //if res isn't undefined
          console.log(res);
          const travels: Travels[] = res;
          const modalOptions = {
            modalClass: 'modal-dialog modal-xl',
            data: {
              allTravels: travels,
              opener: 1, // controlling the state of the  Modal - 0 would indicate no datatable
            },
          };
          this.modalRef = this.modalService.open(
            TravelModalComponent,
            modalOptions
          );
        } else {
          const modalOptions = {
            modalClass: 'modal-dialog modal-xl',
            data: {
              travelStatus: 'No History',
              opener: 0,
            },
          };
          this.modalRef = this.modalService.open(
            TravelModalComponent,
            modalOptions
          );
        }
      });
  }

  openAssignModal(jobData: Job) {
    // the job parameter is passed upon modals creation in the datatable, the 'job' is passed in that moment
    this.getWorkerDataFromJob(jobData.jobID).subscribe(
      (workerIdList: string[]) => {
        // all workers that have already been assigned that job with the id jobData.jobID
  
        let workersWithAssignedProperty = this.createWorkersWithAssignedProperty(workerIdList); //adds the 'assigned' property to the array of worker objects (are the workers assigned that specific job or not)
        this.getDistance( // array of distances in the same order as the workers array
          this.createArrayWorkerAddress(),
          jobData.address
        ).subscribe((distancesArr: string[]) => {
  
          console.log(distancesArr)
          let workerObjWithAssignedNDistanceProperties =
            this.addDistancesProperty(distancesArr, workersWithAssignedProperty);
  
          // Get worker manager satisfaction not assigned
          this.getWorkerManagerSatisfactionNotAssigned(jobData.jobID).subscribe((workersWithPredictedSatisfactionNotAssigned: any) => {
            workersWithPredictedSatisfactionNotAssigned.forEach((workerWithPredictedSatisfaction: { workerID: any; predictedSatisfaction: any; }) => {
              const workerObj = workerObjWithAssignedNDistanceProperties.find(
                (workerObj: { workerID: any; }) => workerObj.workerID === workerWithPredictedSatisfaction.workerID
              );
  
              if (workerObj) {
                workerObj.predictedSatisfaction = workerWithPredictedSatisfaction.predictedSatisfaction;
              }
            });
  
            // Get worker manager satisfaction assigned
            this.getWorkerManagerSatisfactionAssigned(jobData.jobID).subscribe((workersWithPredictedSatisfactionAssigned: any) => {
              workersWithPredictedSatisfactionAssigned.forEach((workerWithPredictedSatisfaction: { workerID: any; predictedSatisfaction: any; }) => {
                const workerObj = workerObjWithAssignedNDistanceProperties.find(
                  (workerObj: { workerID: any; }) => workerObj.workerID === workerWithPredictedSatisfaction.workerID
                );
  
                if (workerObj) {
                  workerObj.predictedSatisfaction = workerWithPredictedSatisfaction.predictedSatisfaction;
                }
              });

              console.log(workerObjWithAssignedNDistanceProperties)
  
              const modalOptions = {
                modalClass: 'modal-dialog modal-xl',
                data: {
                  Job: jobData,
                  AllWorkers: workerObjWithAssignedNDistanceProperties,
                },
              };
  
              this.modalRef = this.modalService.open(
                AssignWorkersModalComponent,
                modalOptions
              );
  
              this.modalRef.onClose.subscribe((message: any) => {
                if (message) {
                  var x: Jwmapping = JSON.parse(message);
  
                  //this.managerService.postJwmapping(x.workerID, x.jobID);
                } else {
                }
              });
            });
          });
        });
      }
    );
  }
  
               

  createArrayWorkerAddress() {
    let temp = new Array<string>(this.workerData.length);

    for (let i = 0; i < this.workerData.length; i++) {
      temp[i] = this.workerData[i].address;
    }
    return temp;
  }
  addDistancesProperty(distances: string[], workerArrWithAssigned: string[]) {
    let temp: any = [...workerArrWithAssigned];
    for (let i = 0; i < temp.length; i++) {
      temp[i].distance = distances[i];
    }
    return temp;
  }
  createWorkersWithAssignedProperty(workerIdList: string[]) {
    let temp: any = [...this.workerData];
    for (let i = 0; i < temp.length; i++) {
      // new temp obj array, which extends workers but has an assigned property to tell the created modal which workers are already assinged to that job
      temp[i].assigned = 0;

      for (let x = 0; x < workerIdList.length; x++) {
        if (temp[i].workerID == workerIdList[x]) {
          temp[i].assigned = 1;
        }
      }
    }
    return temp;
  }

  getDistance(origin: string[], destination: string): Observable<any> {
    return this.managerService.getDistance(origin, destination).pipe(
      map((distances: any) => {
        let distancesList = new Array<string>(this.workerData.length);

        for (let i = 0; i < this.workerData.length; i++) {
          distancesList[i] = distances.rows[i].elements[0].distance.value;
        }
        return distancesList;
      }),
      catchError((val) => of(`I caught: ${val}`))
    );
  }
  confirmJobDelete(
    jobID: string,
    name: string,
    description: string,
    completed: string,
    address: string
  ) {
    if (confirm('Are you sure you want to delete permanently?')) {
      // user clicked OK
      console.log('User confirmed deletion');
      this.managerService
        .deleteJob(jobID, name, description, completed, address)
        .subscribe(() => {
          this.getJobData();
        });
    } else {
      // user clicked Cancel
      console.log('User canceled deletion');
    }
  }
  confirmWorkerDelete(workerID: string) {
    if (confirm('Are you sure you want to delete permanently?')) {
      // user clicked OK
      console.log('User confirmed deletion');
      this.managerService.deleteWorker(workerID).subscribe(() => {
        this.getWorkerData();
      });
    } else {
      // user clicked Cancel
      console.log('User canceled deletion');
    }
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

  getWorkerManagerSatisfactionAssigned(jobID: string): Observable<any> {
    return this.managerService.getWorkersFromJob(jobID).pipe(
      map((workers: any) => {
        let workersList = new Array<{
          workerID: string;
          predictedSatisfaction: number;
        }>(workers.length);
        for (let i = 0; i < workers.length; i++) {
          workersList[i] = {
            workerID: workers[i].workerID,
            predictedSatisfaction: workers[i].predictedSatisfaction,
          };
        }

        return workersList;
      }),
      catchError((val) => of(`I caught: ${val}`))
    );
  }

  getWorkerManagerSatisfactionNotAssigned(jobID: string): Observable<any> {
    return this.managerService.getWorkersNotFromJob(jobID).pipe(
      map((workers: any) => {
        let workersList = new Array<{
          workerID: string;
          predictedSatisfaction: number;
        }>(workers.length);
        for (let i = 0; i < workers.length; i++) {
          workersList[i] = {
            workerID: workers[i].workerID,
            predictedSatisfaction: workers[i].predictedSatisfaction,
          };
        }

        return workersList;
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
