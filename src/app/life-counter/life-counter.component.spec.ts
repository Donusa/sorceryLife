import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCounterComponent } from './life-counter.component';

describe('LifeCounterComponent', () => {
  let component: LifeCounterComponent;
  let fixture: ComponentFixture<LifeCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
