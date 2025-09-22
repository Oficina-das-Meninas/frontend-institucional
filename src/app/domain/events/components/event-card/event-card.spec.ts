import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCard } from './event-card';

describe('EventCard', () => {
  let component: EventCard;
  let fixture: ComponentFixture<EventCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
