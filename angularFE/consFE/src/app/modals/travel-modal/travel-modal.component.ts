import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-travel-modal',
  templateUrl: './travel-modal.component.html',
  styleUrls: ['./travel-modal.component.scss']
})
export class TravelModalComponent {
  dtOptions: DataTables.Settings = {};
  allTravels: any[] = [];
  opener: any;
  travelStatus:any;
  constructor(public modalRef: MdbModalRef<TravelModalComponent>) {
  
  }

}
