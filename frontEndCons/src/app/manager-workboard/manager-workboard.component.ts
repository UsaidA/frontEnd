import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Job } from 'classes';
import { AgGridModule } from '@ag-grid-community/angular';
import { ColDef, ColGroupDef } from '@ag-grid-community/core';
import { DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manager-workboard',
  templateUrl: './manager-workboard.component.html',

  styleUrls: ['./manager-workboard.component.scss']
})
export class ManagerWorkboardComponent implements OnInit{
  containers:Job[] = [];


rowwData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
];
  
  public columnDefss= [
    {field:'Project', rowGroup:true, hide:true},
    {field: 'Job', rowGroup:true, hide:true},
    
  ];

  public defaultColDef= {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  };
  public autoGroupColumnDef = {
    minWidth: 200,
  };

 

  dtOptions: DataTables.Settings ={};
  ngOnInit():void{
    
    const newOb = new Job("12","12", "this is job", "0");
    const newOb1 = new Job("13","13", "this is job 1", "1");
    this.containers.push(newOb)
    this.containers.push(newOb1)


    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 15, 25],
      processing: true
    };

    console.log("fusodkhfaosdfia")
    axios.post('https://maps.googleapis.com/maps/api/distancematrix/json?origins=BB101PR&destinations=S2 4LW&units=imperial&key=AIzaSyBMdO8D7XlI17K5Yn_cgXHQ0LrZ7kws0u0', {headers:{'Content-Type':'application/json'}})
    .then((response) => {
      if (response.data =="failed password" || response.data == "Email doesn't exist"){

        
        console.log(response.data)
      }else{
        
        
      }
      console.log(response.data.rows[0].elements[0].distance)
     
  })
  }
}
