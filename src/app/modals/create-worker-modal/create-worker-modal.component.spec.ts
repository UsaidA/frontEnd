import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkerModalComponent } from './create-worker-modal.component';

describe('CreateWorkerModalComponent', () => {
  let component: CreateWorkerModalComponent;
  let fixture: ComponentFixture<CreateWorkerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
