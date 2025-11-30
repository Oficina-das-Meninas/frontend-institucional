import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicies } from './privacy-policies';

describe('PrivacyPolicies', () => {
  let component: PrivacyPolicies;
  let fixture: ComponentFixture<PrivacyPolicies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});