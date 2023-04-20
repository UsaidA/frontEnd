import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: CreateJobModalComponent;
  let fixture: ComponentFixture<CreateJobModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
