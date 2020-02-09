import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousLorComponent } from './previous-lor.component';

describe('PreviousLorComponent', () => {
  let component: PreviousLorComponent;
  let fixture: ComponentFixture<PreviousLorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousLorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousLorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
