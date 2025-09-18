import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparencyAccordion } from './transparency-accordion';

describe('TransparencyAccordion', () => {
  let component: TransparencyAccordion;
  let fixture: ComponentFixture<TransparencyAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransparencyAccordion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransparencyAccordion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
