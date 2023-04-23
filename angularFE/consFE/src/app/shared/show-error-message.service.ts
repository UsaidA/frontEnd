import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowErrorMessageService {
  @ViewChild('errorMessage') errorMessageRef!: ElementRef;
  constructor() { }

  public showError(): void {
   const errorMessageElement = this.errorMessageRef.nativeElement;
    errorMessageElement.classList.remove('hide');
    errorMessageElement.classList.add('show');

    setTimeout(() => {
      errorMessageElement.classList.add('hide');
      errorMessageElement.classList.remove('show');
    }, 3000);
  }
}
