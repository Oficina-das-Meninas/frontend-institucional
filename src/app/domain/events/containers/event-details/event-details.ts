import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  imports: [],
  templateUrl: './event-details.html',
  styleUrl: './event-details.scss',
})
export class EventDetails {
  private activatedRoute = inject(ActivatedRoute);

  eventId = this.activatedRoute.snapshot.paramMap.get('id');
}
