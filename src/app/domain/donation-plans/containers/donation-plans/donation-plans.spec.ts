import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationPlans } from './donation-plans';

describe('DonationPlans', () => {
  let component: DonationPlans;
  let fixture: ComponentFixture<DonationPlans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationPlans]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationPlans);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
