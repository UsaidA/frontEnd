import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-worker-dropdown',
  standalone: true,
  templateUrl: './worker-dropdown.component.html',
  imports: [NgbDropdownModule],
  styleUrls: ['./worker-dropdown.component.scss']
})
export class WorkerDropdownComponent {
  @Output() viewImageClicked = new EventEmitter<void>();
  @Output() openTravelModalClicked = new EventEmitter<void>();

  viewImageClick() {
    this.viewImageClicked.emit();
  }

  openTravelModal(){
    this.openTravelModalClicked.emit();
  }

}
