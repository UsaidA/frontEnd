import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Job } from 'src/classes';
import { rootUrl } from 'src/services/APIs';

@Component({
  selector: 'app-worker-modal',
  templateUrl: './worker-modal.component.html',
  styleUrls: ['./worker-modal.component.scss']
})
export class WorkerModalComponent {
  
  
  constructor(public modalRef: MdbModalRef<WorkerModalComponent>, private http: HttpClient) {}
  imageList:any;
  Job: any;
  close(): void {
    const closeMessage = 'Model closed';
    this.modalRef.close(closeMessage);
  }
  

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   this.uploadFile(file);
  // }
  
  // uploadFile(file: File) {
    
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   formData.append('job',JSON.stringify(this.Job))
  //   this.http.post(rootUrl + '/images/postImage', formData).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

}
