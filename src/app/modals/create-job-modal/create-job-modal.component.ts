import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Job } from 'src/classes';
import { ManagerService } from '../../shared/manager.service';

@Component({
  selector: 'app-modal',
  templateUrl: './create-job-modal.component.html',
  styleUrls: ['./create-job-modal.component.scss'],
})
export class CreateJobModalComponent {


  @ViewChild('errorMessage') errorMessageRef!: ElementRef;
  constructor(
    public modalRef: MdbModalRef<CreateJobModalComponent>,
    public managerService: ManagerService
  ) {}

  close(): void {
    const closeMessage = 'Model closed';
    this.modalRef.close(closeMessage);
  }
  showError(): void {
    const errorMessageElement = this.errorMessageRef.nativeElement;
    errorMessageElement.classList.remove('hide');
    errorMessageElement.classList.add('show');
  
    setTimeout(() => {
      errorMessageElement.classList.add('hide');
      errorMessageElement.classList.remove('show');
    }, 3000);
  }

  saveJob(jobName: any, jobDes: any, jobAddress: any): void {
    const regex = new RegExp(
      '^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$'
    );

    if (regex.test(jobAddress.value)) {
      //this.errorMessage = "";
      this.showError();
      
      this.managerService
        .isValidPostcode(jobAddress.value)
        .subscribe((response: any) => {
          

            if (response.status=== 'OK') {
              console.log('inside saveJob');
              const job = new Job(
                '',
                jobName.value,
                jobDes.value,
                '0',
                jobAddress.value
              );
              const JSONOBJ = JSON.stringify(job);

              this.modalRef.close(JSONOBJ);
            } else {
              this.showError();
              //this.errorMessage = "Invalid Postcode";
              console.log('invalid postcode');
            }
          
        });
    } else {
      this.showError();
      //this.errorMessage = "Invalid Postcode";
      console.log('bye');
    }
  }
}
