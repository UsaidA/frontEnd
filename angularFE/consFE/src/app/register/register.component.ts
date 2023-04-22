import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { Registration } from '../../classes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('errorMessage') errorMessageRef!: ElementRef;
  constructor() {}

  registerText = '';

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

  passMatch(passOne: any, passTwo: any): boolean {
    if (passOne === passTwo) {
      return true;
    } else {
      return false;
    }
  }

  sendRegisterRequest(email: any, password: any, repeatPass: any) {
    if (this.passMatch(password.value, repeatPass.value)) {
      const registration = new Registration(email.value, password.value);

      console.log(registration);
      const JSONOBJ = JSON.stringify(registration);
      console.log(JSONOBJ);
    } else {
      console.log('passwords must match');
      this.registerText = 'Passwords do not match';
    }
  }
}
