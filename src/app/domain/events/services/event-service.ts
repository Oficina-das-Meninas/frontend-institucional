import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ImageService } from '../../../shared/services/image-service';
import { toLocalDate } from '../../../shared/utils/date-utils';
import { Event } from '../model/event';
import { EventFilters } from '../model/event-filters';
import { EventListResponse } from '../model/event-list-response';
import { EventPage } from '../model/event-page';
import { EventResponse } from '../model/event-response';

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
      previewImageUrl: this.imageService.getPubImageUrl(event.previewImageUrl),
      partnersImageUrl: event.partnersImageUrl ? this.imageService.getPubImageUrl(event.partnersImageUrl) : undefined
    } as Event;
  }

  getById(eventId: string): Observable<Event> {
    return this.httpClient.get<EventResponse>(`${this.API_URL}/${eventId}`).pipe(
      map((res: EventResponse) => {
        const event = res.data;
        return {
          ...event,
          previewImageUrl: event?.previewImageUrl ? this.imageService.getPubImageUrl(event.previewImageUrl) : undefined,
          partnersImageUrl: event?.partnersImageUrl ? this.imageService.getPubImageUrl(event.partnersImageUrl) : undefined,
        } as Event;
      })
    );
  }

  list(
    filters: EventFilters
  ) {
    let params = new HttpParams();

    params = params.set('page', (filters.page ?? 0).toString());
    params = params.set('pageSize', (filters.pageSize ?? 10).toString());

    if (filters.title?.trim()) {
      params = params.set('searchTerm', filters.title.trim());
    }

    if (filters.startDate) {
      params = params.set('startDate', toLocalDate(filters.startDate));
    }
    if (filters.endDate) {
      params = params.set('endDate', toLocalDate(filters.endDate));
    }

    return this.httpClient
      .get<EventListResponse>(this.API_URL, { params })
      .pipe(
        map((eventPage: EventListResponse) => {
          const items = eventPage.data.contents;

          const mappedItems = items.map((ev: any) => ({
            ...ev,
            previewImageUrl: this.imageService.getPubImageUrl(ev.previewImageUrl)
          }));

          return {
            data: mappedItems,
            totalElements: eventPage.data.totalElements,
            totalPages: eventPage.data.totalPages,
          } as EventPage;
        })
      );
  }
}
