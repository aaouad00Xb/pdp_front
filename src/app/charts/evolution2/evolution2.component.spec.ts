import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Evolution2Component } from './evolution2.component';

describe('Evolution2Component', () => {
  let component: Evolution2Component;
  let fixture: ComponentFixture<Evolution2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Evolution2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Evolution2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
