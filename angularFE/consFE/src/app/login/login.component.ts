import {
  Component,
  OnInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import axios from 'axios';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() errorType: string = '';
  @ViewChild('errorMessage') errorMessageRef!: ElementRef;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  constructor(
    public router: Router,
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private authService: AuthService
  ) {}

  loginText = '';
  ngOnInit(): void {}

  Login(email: any, password: any) {
    this.authService.signIn(email.value, password.value).subscribe({
      next: (response: any) => {
        if (response?.accessToken) {
          if (response.accessControl === 1) {
            this.router.navigate(['/managerBoard']);
          } else if (response.accessControl === 0) {
            this.router.navigate(['workerBoard']);
          }
        } else {
          this.loginText = 'Invalid Credentials';
        }

        console.log(response);
      },
      error: (err: any) => {
        
          this.errorType = 'Email or password failed';
          this.showError();
       
      },
    });
  }


  showError(): void {
    const errorMessageElement = this.errorMessageRef.nativeElement;
    errorMessageElement.classList.remove('hide');
    errorMessageElement.classList.add('show');

    setTimeout(() => {
      errorMessageElement.classList.add('hide');
      errorMessageElement.classList.remove('show');
    }, 3000);
  }
}
