import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manager-review-modal',
  templateUrl: './manager-review-modal.component.html',
  styleUrls: ['./manager-review-modal.component.scss']
})
export class ManagerReviewModalComponent {
  @Input() selectedRating = 0;
  @Output() ratingSubmitted = new EventEmitter<number>();

  submitRating() {
    this.ratingSubmitted.emit(this.selectedRating);
    console.log(this.selectedRating);
    //replace the console log with a post request to backend 
  }

}
