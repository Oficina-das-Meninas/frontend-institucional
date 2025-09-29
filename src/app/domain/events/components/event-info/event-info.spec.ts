import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInfo } from './event-info';

describe('EventInfo', () => {
  let component: EventInfo;
  let fixture: ComponentFixture<EventInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
