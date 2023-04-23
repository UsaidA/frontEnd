import { Component, EventEmitter, Output } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { viewJobImagesModalComponent } from '../modals/images-modal/images-modal.component';
import { Job, Travels } from 'src/classes';
import { Router } from '@angular/router';
import { WorkerService } from '../shared/worker.service';
import { AuthService } from '../shared/auth.service';
import { TravelModalComponent } from '../modals/travel-modal/travel-modal.component';
import { CommonService } from '../shared/common.service';
import { rootUrl } from 'src/services/APIs';

@Component({
  selector: 'app-worker-workboard',
  templateUrl: './worker-workboard.component.html',
  styleUrls: ['./worker-workboard.component.scss'],
})
export class WorkerWorkboardComponent {
  opened = true;

  toggleSidebar() {
    this.opened = !this.opened;
  }
  dtTrigger: Subject<any> = new Subject();
  modalRef: MdbModalRef<viewJobImagesModalComponent> | null = null;
  today: string = new Date().toISOString().slice(0, 10);
  workerID = '';
  firstName = '';
  lastName = '';
  email = '';
  workerAddress = '';
  @Output() viewImageClicked = new EventEmitter<void>();
  @Output() openTravelModalClicked = new EventEmitter<void>();
  @Output() uploadImageModalClicked = new EventEmitter<void>();

  public jData: Job[] = [];
 
  constructor(
    private router: Router,
    private workerService: WorkerService,
    private commonService: CommonService,
    private authService: AuthService,
    private modalService: MdbModalService
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getJobData();
    this.getWorkerDetails();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 15, 25],
      processing: true,
      autoWidth: false
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
  
      this.workerID = worker.workerID
      this.firstName = worker.firstName;
      this.lastName = worker.lastName;
      this.email = worker.email;
      this.workerAddress = worker.address;
    });
  }
  postTravelDetails(jobData:Job){
    let origin: string[] = [];
    origin[0] = this.workerAddress;
    this.workerService.getDistance(origin, jobData.address).subscribe((distance:any)=>{
      if (distance.status === "OK"){
        console.log(this.workerID,this.firstName, "worker id")
        console.log(this.workerID,jobData.jobID,distance.rows[0].elements[0].distance.value,this.today)
        this.workerService.postTravelObj(this.workerID,jobData.jobID,distance.rows[0].elements[0].distance.value,this.today).subscribe();
      }
    })

  }

  getImageKeysFromJob(jobID: string): Observable<any> {
    return this.commonService.getImageKeysForJob(jobID).pipe(
      map((keys: any) => {
        let keysList = new Array<string>(keys.length);
        for (let i = 0; i < keys.length; i++) {
          keysList[i] =
            rootUrl + '/images/images/' + keys[i].image_key;
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

  openTravelModal(jobData: Job) {
    this.workerService
      .getTravelDetails(jobData.jobID)
      .subscribe((travelDetails: any) => {
        const objects: Travels[] = travelDetails;
        let travelStatus = "";
 
        for (const obj of objects) {
          if (obj.dateTravelled === this.today) {
            travelStatus = "Already Travelled Today";
            break; 
          }
        }
        if( travelStatus === ""){
          
          this.postTravelDetails(jobData)
          travelStatus = "Travel Submitted"
        }
       
        const modalOptions = {
          modalClass: 'modal-dialog-scrollable',
          data: {
            travelStatus: travelStatus,
            opener: 0
          },
        };
        this.modalRef = this.modalService.open(
          TravelModalComponent,
          modalOptions
        );
      });
  }
  onFileSelected(event: any, job: Job) {
    const file: File = event.target.files[0];
    this.uploadFile(file, job);
  }

  uploadFile(file: File, job: Job) {
    this.workerService.uploadFile(file, job).subscribe((res: any) => {
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

    console.log(jobID, name, description, completed, address);

    if (completed === 'true') {
      console.log('Job Complete');
      completed = 1;
    } else if (completed === 'false') {
      completed = 0;
    }
    var job = new Job(jobID, name, description, completed, address);

    console.log(job, ': job OBJ');
    
    this.workerService.postJobObj(jobID, name, description,completed, address).subscribe();
  }

  ngOndestroy() {
    console.log('Manager dashbaord destroyed');
  }
}
