import { Component, OnInit } from '@angular/core';
import { AngularGridInstance, Column, ContainerService, GridOption } from 'angular-slickgrid';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-slick-grid',
  templateUrl: './slick-grid.component.html',
  styleUrls: ['./slick-grid.component.scss'],
  providers: [ContainerService]
})
export class MyComponent implements OnInit {
  gridReady(angularGrid: AngularGridInstance): void {
    this.grid = angularGrid;
  }
  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title' },
      { id: 'director', name: 'Director', field: 'director' },
      { id: 'year', name: 'Year', field: 'year' }
    ];
    this.gridOptions = {
      enableAutoResize: true,
      enableCellNavigation: true,
      enableColumnReorder: false
    };
  }
  grid!: AngularGridInstance;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset: any[] = [];
}
