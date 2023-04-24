import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './manager-review.component.html',
  styleUrls: ['./manager-review.component.scss']
})
export class ManagerReviewComponent {
  @Input() selectedRating = 0;
  @Output() ratingSubmitted = new EventEmitter<number>();

  submitRating() {
    this.ratingSubmitted.emit(this.selectedRating);
    console.log(this.selectedRating);
    //replace the console log with a post request to backend 
  }
}
