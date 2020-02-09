import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedlorComponent } from './reviewedlor.component';

describe('ReviewedlorComponent', () => {
  let component: ReviewedlorComponent;
  let fixture: ComponentFixture<ReviewedlorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewedlorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewedlorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
