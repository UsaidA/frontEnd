import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Job, Worker } from '../../classes';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { allJobsKey, allWorkerKey, jwtTokenKey } from 'src/services/itemsKeys';
import { sendJobData } from 'src/services/services';
import { ManagerService } from '../shared/manager.service';
import { AuthService } from '../shared/auth.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';

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

  checkVal(
    jobID: any,
    name: any,
    description: any,
    completed: any,
    address: any
  ) {
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
    console.log(jwtTokenKey);
  }
  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { title: 'Job Details' },
    });

    this.modalRef.onClose.subscribe((message: any) => {
      if (message) {
        console.log(message);
        var x: Job = JSON.parse(message);

        this.managerService
          .postJob(x.name, x.description, x.completed, x.address)
          .subscribe((res: any) => {
            this.getJobData();
          });
      }else{
        console.log("nyet")
      }
    });
  }

  getDistance() {
    console.log('fusodkhfaosdfia');
    axios
      .post(
        'https://maps.googleapis.com/maps/api/distancematrix/json?origins=BB101PR&destinations=S2 4LW&units=imperial&key=AIzaSyBMdO8D7XlI17K5Yn_cgXHQ0LrZ7kws0u0',
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        if (
          response.data == 'failed password' ||
          response.data == "Email doesn't exist"
        ) {
          console.log(response.data);
        } else {
        }
        console.log(response.data.rows[0].elements[0].distance);
      });
  }

  LogOut() {
    this.authService.doLogout();
  }

  ngOndestroy() {
    console.log('Manager dashbaord destroyed');
  }
}
