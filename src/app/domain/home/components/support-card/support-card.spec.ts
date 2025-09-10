import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCard } from './support-card';

describe('SupportCard', () => {
  let component: SupportCard;
  let fixture: ComponentFixture<SupportCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
