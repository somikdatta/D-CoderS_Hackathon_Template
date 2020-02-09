import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HodSignupComponent } from './hod-signup.component';

describe('HodSignupComponent', () => {
  let component: HodSignupComponent;
  let fixture: ComponentFixture<HodSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HodSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HodSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
