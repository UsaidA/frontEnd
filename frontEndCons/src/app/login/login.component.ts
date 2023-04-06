import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import axios from 'axios';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { data } from 'jquery';
import { ManagerWorkboardComponent } from '../manager-workboard/manager-workboard.component';

import { sendLoginRequest } from 'services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('')
  })

  constructor(public router :Router, private vcr:ViewContainerRef, private cfr: ComponentFactoryResolver) { }

  loginText = "";
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  Login(email:any, password:any){
    sendLoginRequest(email,password)
    this.loadManagerWorkboard();
  }
  
  async loadManagerWorkboard(){
    
    this.vcr.clear();
    const {ManagerWorkboardComponent} = await import('../manager-workboard/manager-workboard.component');
    //const {GridCompositeEditorComponent} = await import('../testComp/test.component')
    this.vcr.createComponent(this.cfr.resolveComponentFactory(ManagerWorkboardComponent));
    this.router.navigate(['/managerBoard']);
  }
}



