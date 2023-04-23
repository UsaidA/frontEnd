import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowErrorMessageService {
  constructor() { }

  public showError(errorMessageRef?: ElementRef): void {
    if (!errorMessageRef) {
      console.error('Error: No ElementRef provided');
      return;
    }
    
    const errorMessageElement = errorMessageRef.nativeElement;
    errorMessageElement.classList.remove('hide');
    errorMessageElement.classList.add('show');

    setTimeout(() => {
      errorMessageElement.classList.add('hide');
      errorMessageElement.classList.remove('show');
    }, 3000);
  }
}