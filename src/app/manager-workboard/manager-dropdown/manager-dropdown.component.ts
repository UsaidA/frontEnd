import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-manager-dropdown',
  standalone: true,
  templateUrl: './manager-dropdown.component.html',
  imports: [NgbDropdownModule, CommonModule],
  styleUrls: ['./manager-dropdown.component.scss']
})
export class ManagerDropdownComponent {
  @Input() isJob: boolean | undefined;
  @Output() viewImageClicked = new EventEmitter<void>();
  @Output() openAssignModalClicked = new EventEmitter<void>();
  @Output() openEditJobClicked = new EventEmitter<void>();
  @Output() openTravelModalClicked = new EventEmitter<void>();
  @Output() openEditWorkerClicked = new EventEmitter<void>();
  @Output() openManagerReviewModal = new EventEmitter<void>();
  
  viewImageClick() {
    this.viewImageClicked.emit();
  }

  openAssignWorkerClick(){
    this.openAssignModalClicked.emit();
  }

  openEditJobClick(){
    this.openEditJobClicked.emit();
  }



  openTravelHistoryModalClick(){
    
    this.openTravelModalClicked.emit();
  }

  openEditWorkerClick(){
    this.openEditWorkerClicked.emit();
  }

  openManagerReviewModalClick(){
    this.openManagerReviewModal.emit();
  }

  

}



