import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Job } from 'src/classes';
import { ManagerService } from '../../shared/manager.service';
import { ShowErrorMessageService } from 'src/app/shared/show-error-message.service';

@Component({
  selector: 'app-modal',
  templateUrl: './create-job-modal.component.html',
  styleUrls: ['./create-job-modal.component.scss'],
})
export class CreateJobModalComponent {
  job: Job = new Job("","","","","","");
  openType: any;
  jobTypes:any;

  @ViewChild('errorMessage') errorMessageRef!: ElementRef;
  constructor(
    public modalRef: MdbModalRef<CreateJobModalComponent>,
    public managerService: ManagerService,
    private displayErrorMessage: ShowErrorMessageService
  ) {}

  close(): void {
    const closeMessage = 'Model closed';
    this.modalRef.close(closeMessage);
  }

  saveJob(jobName: any, jobType:any, jobDes: any, jobAddress: any): void {
    const regex = new RegExp(
      '^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$'
    );

    if (regex.test(jobAddress.value)) {
      this.displayErrorMessage.showError(this.errorMessageRef);

      this.managerService
        .isValidPostcode(jobAddress.value)
        .subscribe((response: any) => {
          if (response.status === 'OK') {
            console.log(jobType.value)
            
            if (this.openType === 'update') {
              console.log(jobDes.value)
              const jobT = new Job(
                this.job.jobID,
                jobName.value,
                jobDes.value,
                this.job.completed,
                jobAddress.value,
                jobType.value
              );
              const JSONOBJ = JSON.stringify(jobT);
              this.modalRef.close(JSONOBJ);
            } else {
              const jobT = new Job(
                '',
                jobName.value,
                jobDes.value,
                '0',
                jobAddress.value,
                jobType.value
              );
              const JSONOBJ = JSON.stringify(jobT);
              this.modalRef.close(JSONOBJ);
            }
          } else {
            this.displayErrorMessage.showError(this.errorMessageRef);
            console.log('invalid postcode');
          }
        });
    } else {
      this.displayErrorMessage.showError(this.errorMessageRef);
    }
  }
}
