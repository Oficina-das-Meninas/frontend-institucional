import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ImageService } from '../../../shared/services/image-service';
import { toLocalDateTime } from '../../../shared/utils/date-utils';
import { Event } from '../model/event';
import { EventPage } from '../model/event-page';


@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly API_URL = `${environment.apiUrl}/events`;
  private httpClient = inject(HttpClient);
  private imageService = inject(ImageService);

  private eventCache = new Map<string, Event>();

  private transformEvent(event: Event): Event {
    return {
      ...event,
      previewImageUrl: this.imageService.getImageUrl(event.previewImageUrl),
      partnersImageUrl: event.partnersImageUrl ? this.imageService.getImageUrl(event.partnersImageUrl) : undefined
    } as Event;
  }

  getById(id: string): Observable<Event> {
    if (this.eventCache.has(id)) return of(this.eventCache.get(id)!);

    return this.httpClient.get<Event>(`${this.API_URL}/${id}`, {}).pipe(
      first(),
      map(event => {
        const transformedEvent = this.transformEvent(event);
        this.eventCache.set(id, transformedEvent);
        return transformedEvent;
      })
    );
  }

  list(
    page = 0,
    pageSize = 10,
    title: string | null = null,
    startDate: Date | null = null,
    endDate: Date | null = null
  ) {
    let params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize));
    if (title && title.trim()) {
      params = params.set('title', title.trim());
    }
    if (startDate) {
      params = params.set('startDate', toLocalDateTime(startDate, false));
    }
    if (endDate) {
      params = params.set('endDate', toLocalDateTime(endDate, true));
    }

    return this.httpClient
      .get<EventPage>(this.API_URL, { params })
      .pipe(
        first(),
        map(eventPage => {
          const transformed = {
            ...eventPage,
            data: eventPage.data.map(event => {
              const transformedEvent = this.transformEvent(event);
              this.eventCache.set(event.id, transformedEvent);
              return transformedEvent;
            })
          };
          return transformed as EventPage;
        })
      );
  }
}
