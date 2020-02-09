import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedrequestsComponent } from './closedrequests.component';

describe('ClosedrequestsComponent', () => {
  let component: ClosedrequestsComponent;
  let fixture: ComponentFixture<ClosedrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
