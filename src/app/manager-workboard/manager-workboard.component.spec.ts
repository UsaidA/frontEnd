import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerWorkboardComponent } from './manager-workboard.component';

describe('ManagerWorkboardComponent', () => {
  let component: ManagerWorkboardComponent;
  let fixture: ComponentFixture<ManagerWorkboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerWorkboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerWorkboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
