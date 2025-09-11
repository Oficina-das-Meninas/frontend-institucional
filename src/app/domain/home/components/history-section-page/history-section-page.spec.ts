import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySectionPage } from './history-section-page';

describe('HistorySectionPage', () => {
  let component: HistorySectionPage;
  let fixture: ComponentFixture<HistorySectionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorySectionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
