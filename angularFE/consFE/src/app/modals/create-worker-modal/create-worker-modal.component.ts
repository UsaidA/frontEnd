import { ManagerService } from './../../shared/manager.service';
import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Worker } from 'src/classes';

@Component({
  selector: 'app-create-worker-modal',
  templateUrl: './create-worker-modal.component.html',
  styleUrls: ['./create-worker-modal.component.scss']
})
export class CreateWorkerModalComponent {
  constructor(public modalRef: MdbModalRef<CreateWorkerModalComponent>, public managerService: ManagerService) {}

  close(): void {
    const closeMessage = 'Model closed';
    this.modalRef.close(closeMessage);
  }

  saveJob(firstName: any, lastName: any, address: any, email:any): void {
    const regex = new RegExp(
      '^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$'
    );

    if (regex.test(address.value)) {
      console.log('hi');

      this.managerService
        .isValidPostcode(address.value)
        .subscribe((response: any) => {
          

            if (response.status=== 'OK') {
              console.log('inside saveJob');
              const worker = new Worker(
                '',
                firstName.value,
                lastName.value,
                email.value,
                address.value
              );
              const JSONOBJ = JSON.stringify(worker);

              this.modalRef.close(JSONOBJ);
            } else {
              console.log('invalid postcode');
            }
          
        });
    } else {
      console.log('bye');
    }
  }

}
