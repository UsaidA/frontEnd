import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerReviewModalComponent } from './manager-review-modal.component';

describe('ManagerReviewModalComponent', () => {
  let component: ManagerReviewModalComponent;
  let fixture: ComponentFixture<ManagerReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerReviewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
