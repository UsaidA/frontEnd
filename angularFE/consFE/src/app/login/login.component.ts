import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import axios from 'axios';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { sendLoginRequest } from '../../services/services';
import { AuthService } from '../shared/auth.service';



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

  constructor( public router :Router,private vcr:ViewContainerRef, private cfr: ComponentFactoryResolver, private authService: AuthService) { }

  loginText = "";
  ngOnInit(): void {
    
  }

  Login(email:any, password:any){
    this.authService.signIn(email.value,password.value).subscribe(response => {

      if(response?.accessToken){
        this.router.navigate(['/managerBoard'])
      }else{
        this.loginText = "Invalid Credentials"
      }
    })
    //sendLoginRequest(email,password)
   
  }
  
  async loadManagerWorkboard(){
    
    this.vcr.clear();
    const {ManagerWorkboardComponent} = await import('../manager-workboard/manager-workboard.component');
    //this.vcr.createComponent(this.cfr.resolveComponentFactory(ManagerWorkboardComponent));
    this.router.navigate(['/managerBoard']);
  }
}

