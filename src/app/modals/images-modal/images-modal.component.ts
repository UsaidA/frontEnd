import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Job } from 'src/classes';
import { rootUrl } from 'src/services/APIs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-worker-modal',
  templateUrl: './images-modal.component.html',
  styleUrls: ['./images-modal.component.scss'],
})
export class viewJobImagesModalComponent {
  constructor(
    public modalRef: MdbModalRef<viewJobImagesModalComponent>,
    private http: HttpClient,
    private commonService: CommonService
  ) {}
  @Input() imageList: any;
  Job: any;
  close(): void {
    const closeMessage = 'Model closed';
    this.modalRef.close(closeMessage);
  }

  deleteImage(imageUrl: string) {
    const url = imageUrl;
    const lastIndex = url.lastIndexOf('images/') + 'images/'.length;
    const lastKey = url.substring(lastIndex);
    console.log(lastKey);
    this.commonService.deleteImageFromJob(lastKey).subscribe(() => {
      const index = this.imageList.indexOf(imageUrl);
      if (index !== -1) {
        this.imageList.splice(index, 1);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imageList'] && !changes['imageList'].firstChange) {
      window.location.reload();
    }
  }
}
