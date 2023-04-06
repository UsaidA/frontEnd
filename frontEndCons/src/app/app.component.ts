import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'frontEndCons';
  name = 'Angular 6';
  dataSource:number[] = [];  
  onAddData() {
  this.dataSource.push(this.dataSource.length);
 }
}
