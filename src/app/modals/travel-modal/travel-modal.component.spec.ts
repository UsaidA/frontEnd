import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelModalComponent } from './travel-modal.component';

describe('TravelModalComponent', () => {
  let component: TravelModalComponent;
  let fixture: ComponentFixture<TravelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
