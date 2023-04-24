import { ComponentFixture, TestBed } from '@angular/core/testing';

import { viewJobImagesModalComponent } from './images-modal.component';

describe('WorkerModalComponent', () => {
  let component: viewJobImagesModalComponent;
  let fixture: ComponentFixture<viewJobImagesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ viewJobImagesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(viewJobImagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
