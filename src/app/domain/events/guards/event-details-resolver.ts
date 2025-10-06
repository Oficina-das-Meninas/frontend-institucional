import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Event } from '../model/event';
import { EventService } from '../services/event-service';

export const eventDetailsResolver: ResolveFn<Event> = (route: ActivatedRouteSnapshot): Observable<Event> => {
  const eventService = inject(EventService);
  const router = inject(Router);
  const eventId = route.paramMap.get('id');

  if (!eventId) {
    router.navigate(['/eventos']);
    return EMPTY;
  }

  return eventService.getById(eventId).pipe(
    catchError(() => {
      router.navigate(['/eventos']);
      return EMPTY;
    })
  );
};
