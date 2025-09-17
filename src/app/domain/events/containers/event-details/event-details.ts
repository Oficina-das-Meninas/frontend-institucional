import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../model/event';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-event-details',
  imports: [],
  templateUrl: './event-details.html',
  styleUrl: './event-details.scss',
})
export class EventDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private eventService = inject(EventService);

  event: Event = {} as Event;

  eventId = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    if (this.eventId) {
      this.event = this.eventService.getById(this.eventId);
    }
  }
}
