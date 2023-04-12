import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerModalComponent } from './worker-modal.component';

describe('WorkerModalComponent', () => {
  let component: WorkerModalComponent;
  let fixture: ComponentFixture<WorkerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
