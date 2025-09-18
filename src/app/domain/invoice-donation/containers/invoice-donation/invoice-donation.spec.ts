import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDonation } from './invoice-donation';

describe('InvoiceDonation', () => {
  let component: InvoiceDonation;
  let fixture: ComponentFixture<InvoiceDonation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDonation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDonation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
