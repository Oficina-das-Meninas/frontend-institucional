import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerStat } from './flower-stat';

describe('FlowerStat', () => {
  let component: FlowerStat;
  let fixture: ComponentFixture<FlowerStat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowerStat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowerStat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
