import { Component, Input } from '@angular/core';
import { EventCard } from '../event-card/event-card';
import { Event } from '../../model/event';

@Component({
  selector: 'app-events-list',
  imports: [EventCard],
  templateUrl: './events-list.html',
  styleUrl: './events-list.scss',
})
export class EventsList {
  @Input() events: Event[] = [];
}
