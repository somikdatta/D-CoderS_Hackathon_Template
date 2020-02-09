import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLorComponent } from './new-lor.component';

describe('NewLorComponent', () => {
  let component: NewLorComponent;
  let fixture: ComponentFixture<NewLorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
