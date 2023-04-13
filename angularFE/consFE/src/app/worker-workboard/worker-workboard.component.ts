import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { WorkerModalComponent } from '../worker-modal/worker-modal.component';
import { Job } from 'src/classes';
import { Router } from '@angular/router';
import { WorkerService } from '../shared/worker.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-worker-workboard',
  templateUrl: './worker-workboard.component.html',
  styleUrls: ['./worker-workboard.component.scss'],
})
export class WorkerWorkboardComponent {
  dtTrigger: Subject<any> = new Subject();
  modalRef: MdbModalRef<WorkerModalComponent> | null = null;
  firstName = '';
  lastName = '';
  email = '';
  temp = '';

  public jData: Job[] = [];
  public workerData: Worker[] = [];
  constructor(
    private router: Router,
    private workerService: WorkerService,
    private authService: AuthService,
    private modalService: MdbModalService
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getJobData();
    this.getWorkerDetails();
    // add the worker and job services here

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 15, 25],
      processing: true,
    };
  }

  dtOptions: DataTables.Settings = {};
  dtElement: any;

  getJobData() {
    this.workerService.getWorkersJobs().subscribe((jobs: any) => {
      this.jData = jobs ?? [];
    });
  }
  getWorkerDetails() {
    this.workerService.getWorkersDetails().subscribe((worker: any) => {
      console.log(worker);
      this.firstName = worker.firstName;
      this.lastName = worker.lastName;
      this.email = worker.email;
    });
  }
  // getImageKeysFromJob(jobID:string){

  //   this.workerService.getImageKeysForJob(jobID).subscribe((keys: any) => {
  //     console.log(keys, "keys")
  //     let keysList = new Array<string>(keys.length)
  //     for (let i = 0; i < keys.length; i ++){
  //       keysList[i] = "http://localhost:8888/api/images/" + keys[i].image_key
  //     }

  //     console.log(keysList)
  //     return keys;

  //   });
  // }
  getImageKeysFromJob(jobID: string): Observable<any> {
    return this.workerService.getImageKeysForJob(jobID).pipe(
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

  LogOut() {
    this.authService.doLogout();
  }
  openModal(jobData: Job) {

    this.getImageKeysFromJob(jobData.jobID).subscribe((keyList: string[]) => {
      console.log(keyList);
      const modalOptions = {
        modalClass: 'modal-dialog-scrollable',
        data: {
          Job: jobData,
          imageList: keyList,
        },
      };

      console.log('this should be second to keys');
      this.modalRef = this.modalService.open(
        WorkerModalComponent,
        modalOptions
      );
    });
  }
  onFileSelected(event: any, job : Job) {
    const file: File = event.target.files[0];
    this.uploadFile(file, job);
  }
  
  uploadFile(file: File, job: Job) {
    
    this.workerService.uploadFile(file,job).subscribe((res: any) => {
      console.log(res);
      
    });
   
  }
  checkVal(
    jobID: any,
    name: any,
    description: any,
    completed: any,
    address: any
  ) {
    /*
    console.log(jobID, name, description, completed, address);

    if (completed === 'true') {
      console.log('has Attended true');
      completed = 1;
    } else if (completed === 'false') {
      completed = 0;
    }
    var job = new Job(jobID, name, description, completed, address);

    console.log(job, ': job OBJ');
    var jwt = localStorage.getItem(jwtTokenKey);
    if (jwt == null) {
      console.log('null issue in manager workboard');
    } else {
      console.log(jwt);
      sendJobData(jwt, job);
    }
    console.log(jwtTokenKey); */
  }

  ngOndestroy() {
    console.log('Manager dashbaord destroyed');
  }
}
