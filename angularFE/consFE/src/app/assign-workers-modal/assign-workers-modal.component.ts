import { Component } from '@angular/core';
import { Job, Worker } from '../../classes';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-assign-workers-modal',
  templateUrl: './assign-workers-modal.component.html',
  styleUrls: ['./assign-workers-modal.component.scss']
})
export class AssignWorkersModalComponent {
  dtOptions: DataTables.Settings = {};
  Workers: Worker[] = [];
  Job: any;
  
  constructor(public modalRef: MdbModalRef<AssignWorkersModalComponent>) {}
}
