import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateConverterComponent } from './rate-converter.component';

describe('RateConverterComponent', () => {
  let component: RateConverterComponent;
  let fixture: ComponentFixture<RateConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
