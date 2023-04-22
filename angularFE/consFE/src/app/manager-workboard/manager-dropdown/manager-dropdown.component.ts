import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-manager-dropdown',
  standalone: true,
  templateUrl: './manager-dropdown.component.html',
  imports: [NgbDropdownModule],
  styleUrls: ['./manager-dropdown.component.scss']
})
export class ManagerDropdownComponent {
  @Output() viewImageClicked = new EventEmitter<void>();
  @Output() openAssignModalClicked = new EventEmitter<void>();
  @Output() openEditJobClicked = new EventEmitter<void>();
  
  viewImageClick() {
    this.viewImageClicked.emit();
  }

  openAssignWorkerClick(){
    this.openAssignModalClicked.emit();
  }

  openEditJobClick(){
    this.openEditJobClicked.emit();
  }



  // openTravelModal(){
  //   this.openTravelModalClicked.emit();
  // }

}



