import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluviometerComponent } from './pluviometer.component';

describe('PluviometerComponent', () => {
  let component: PluviometerComponent;
  let fixture: ComponentFixture<PluviometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PluviometerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluviometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
