import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPaginator } from './event-paginator';

describe('EventPaginator', () => {
  let component: EventPaginator;
  let fixture: ComponentFixture<EventPaginator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPaginator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPaginator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
