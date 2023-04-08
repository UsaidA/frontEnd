import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/services/itemsKeys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = "consFE"
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    window.addEventListener('beforeunload', () => {
      this.localStorageService.clearAppLocalStorage();
    });
  }
}