import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFacilityComponent } from './user-facility.component';

describe('UserFacilityComponent', () => {
  let component: UserFacilityComponent;
  let fixture: ComponentFixture<UserFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
