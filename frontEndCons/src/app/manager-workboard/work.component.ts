import { Component, Input } from '@angular/core';
import { Job } from 'classes';

@Component({
  selector: 'work',
  template: `
  


    <div >
        <div  class = "row">

        <div id="contentInside" *ngFor="let container of containers" >
          
            <div  class="card" style = "width: 19rem">
        
            <div class="card-body">{{container.jobID}}
                <p class="card-text">Some and make up the bulk of the card's content.</p>
            </div>
        </div>
     
        </div>
    </div>
  `,
  styles: [`
   
   
  `]
})

export class WorkComponent {

    containers:any[] = [];

  constructor() { 
    const newOb = new Job("Job ID","ProjectID", "Job Description", "Completion Status");
    const newOb1 = new Job("Job ID","ProjectID", "Job Description", "1");
    this.containers.push(newOb)
    this.containers.push(newOb1)

    /*
    for (let i =0; i < 3; i++){
        this.containers.push(this.containers[i]);
    }
  #content{
      width:100%;
      height:90px;
      border:1px solid black;
    }
    #contentInside{
      width:100px;
      height:70px;
      margin:7px;
      border:1px solid black;
      display:inline-flex;
    }
    
*/
  }

  
  add() {
    this.containers.push();
  }
}