import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Job } from 'src/classes';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(public modalRef: MdbModalRef<ModalComponent>) {}

  close(): void {
    const closeMessage = 'Model closed';
    this.modalRef.close(closeMessage);
  }

  saveJob(jobName: any, jobDes: any, jobAddress: any): void {
    const job = new Job('', jobName.value, jobDes.value, '0', jobAddress.value);
    const JSONOBJ = JSON.stringify(job);

    this.modalRef.close(JSONOBJ);
  }
}
