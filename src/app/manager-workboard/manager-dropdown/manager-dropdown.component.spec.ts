import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDropdownComponent } from './manager-dropdown.component';

describe('ManagerDropdownComponent', () => {
  let component: ManagerDropdownComponent;
  let fixture: ComponentFixture<ManagerDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
