import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalevaluationComponent } from './finalevaluation.component';

describe('FinalevaluationComponent', () => {
  let component: FinalevaluationComponent;
  let fixture: ComponentFixture<FinalevaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalevaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
