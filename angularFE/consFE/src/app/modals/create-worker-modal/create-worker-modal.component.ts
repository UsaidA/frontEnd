import { ManagerService } from './../../shared/manager.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Worker } from 'src/classes';
import { ShowErrorMessageService } from 'src/app/shared/show-error-message.service';

@Component({
  selector: 'app-create-worker-modal',
  templateUrl: './create-worker-modal.component.html',
  styleUrls: ['./create-worker-modal.component.scss'],
})
export class CreateWorkerModalComponent {
  worker: Worker = new Worker('', '', '', '', '');
  openType: any;
  @ViewChild('errorMessage') errorMessageRef!: ElementRef;
  constructor(
    public modalRef: MdbModalRef<CreateWorkerModalComponent>,
    public managerService: ManagerService,
    private displayErrorMessage: ShowErrorMessageService
  ) {}

  close(): void {
    const closeMessage = 'Model closed';
    this.modalRef.close(closeMessage);
  }

  saveJob(firstName: any, lastName: any, address: any, email: any): void {
    const regex = new RegExp(
      '^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$'
    );

    if (regex.test(address.value)) {
      console.log('hi');

      this.managerService
        .isValidPostcode(address.value)
        .subscribe((response: any) => {
          if (response.status === 'OK') {
            if (this.openType === 'update') {
              console.log(firstName.value);
              const workerT = new Worker(
                this.worker.workerID,
                firstName.value,
                lastName.value,
                email.value,
                address.value,
                
              );
              const JSONOBJ = JSON.stringify(workerT);
              this.modalRef.close(JSONOBJ);
            } else {
              const workerT = new Worker(
                '',
                firstName.value,
                lastName.value,
                email.value,
                address.value,
                
              );
              const JSONOBJ = JSON.stringify(workerT);
              this.modalRef.close(JSONOBJ);
            }
          
          } else {
            this.displayErrorMessage.showError();
            console.log('invalid postcode');
          }
        });
    } else {
      this.displayErrorMessage.showError();
      console.log('bye');
    }
  }
}
