import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFilter } from './calendar-filter';

describe('CalendarFilter', () => {
  let component: CalendarFilter;
  let fixture: ComponentFixture<CalendarFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
