import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWorkersModalComponent } from './assign-workers-modal.component';

describe('AssignWorkersModalComponent', () => {
  let component: AssignWorkersModalComponent;
  let fixture: ComponentFixture<AssignWorkersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignWorkersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignWorkersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
