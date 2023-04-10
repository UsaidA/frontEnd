import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerWorkboardComponent } from './worker-workboard.component';

describe('WorkerWorkboardComponent', () => {
  let component: WorkerWorkboardComponent;
  let fixture: ComponentFixture<WorkerWorkboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerWorkboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerWorkboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
