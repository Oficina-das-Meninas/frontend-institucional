import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsList } from './events-list';

describe('EventsList', () => {
  let component: EventsList;
  let fixture: ComponentFixture<EventsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
