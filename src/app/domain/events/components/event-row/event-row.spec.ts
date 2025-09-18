import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRow } from './event-row';

describe('EventRow', () => {
  let component: EventRow;
  let fixture: ComponentFixture<EventRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
