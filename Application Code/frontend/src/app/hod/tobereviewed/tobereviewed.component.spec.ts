import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TobereviewedComponent } from './tobereviewed.component';

describe('TobereviewedComponent', () => {
  let component: TobereviewedComponent;
  let fixture: ComponentFixture<TobereviewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TobereviewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TobereviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
