import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { Registration } from '../../classes';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() errorType: string = '';
  @Input() success: string = "Success!";
  @ViewChild('errorMessage') errorMessageRef!: ElementRef;
  @ViewChild('successMessage') successMessageRef!: ElementRef;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  showError(): void {
    const errorMessageElement = this.errorMessageRef.nativeElement;
    errorMessageElement.classList.remove('hide');
    errorMessageElement.classList.add('show');

    setTimeout(() => {
      errorMessageElement.classList.add('hide');
      errorMessageElement.classList.remove('show');
    }, 3000);
  }
  showSuccess(): void {
    const errorMessageElement = this.successMessageRef.nativeElement;
    errorMessageElement.classList.remove('hide');
    errorMessageElement.classList.add('show');

    setTimeout(() => {
      errorMessageElement.classList.add('hide');
      errorMessageElement.classList.remove('show');
    }, 3000);
  }

  passMatch(passOne: any, passTwo: any): boolean {
    if (passOne === passTwo) {
      return true;
    } else {
      return false;
    }
  }

  sendRegisterRequest(email: any, password: any, repeatPass: any) {
    if (this.passMatch(password.value, repeatPass.value)) {
      this.authService.register(email.value, password.value).subscribe({
        next: (res: any) => {
          this.showSuccess()
          console.log(res);
        },
        error: (err: any) => {

          if(err.status ===404){
            this.errorType = "Worker Doesn't Exist";
            this.showError();
          }else if(err.status ===500){
            this.errorType = "Worker Already Exists";
            this.showError();
          }
         
        },
      });
    } else {
      console.log('passwords must match');
      this.errorType = 'Passwords must match';
      this.showError();
    }
  }
}
