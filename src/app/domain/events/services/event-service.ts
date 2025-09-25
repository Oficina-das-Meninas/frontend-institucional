import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EventPage } from '../model/event-page';
import { toLocalDateTime } from '../../../shared/utils/date-utils';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly API_URL = `${environment.apiUrl}/events`;
  private httpClient = inject(HttpClient);

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
      .pipe(first());
  }
}
