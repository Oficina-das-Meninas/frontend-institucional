import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { catchError, Observable, of, tap } from 'rxjs';
import { CalendarFilter } from '../../../../shared/components/calendar-filter/calendar-filter';
import { DateRange } from '../../../../shared/models/date-range';
import { EventPaginator } from '../../components/event-paginator/event-paginator';
import { EventsList } from '../../components/events-list/events-list';
import { EventPage } from '../../model/event-page';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-events',
  imports: [
    EventsList,
    EventPaginator,
    AsyncPipe,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinner,
    MatButtonModule,
    MatTooltipModule,
    MatDatepickerModule,
    CalendarFilter,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './events.html',
  styleUrl: './events.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Events {
  events$: Observable<EventPage> | null = null;

  private eventService = inject(EventService);

  pageIndex = 0;
  pageSize = 9;

  searchEvent = '';

  dateRange: DateRange = {
    start: null,
    end: null,
  };

  ngOnInit() {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 9 }) {
    this.events$ = this.eventService
      .list(
        pageEvent.pageIndex,
        pageEvent.pageSize,
        this.searchEvent,
        this.dateRange.start,
        this.dateRange.end
      )
      .pipe(
        tap(() => this.updatePagination(pageEvent)),
        catchError(() => this.emptyEventPage())
      );
  }

  private updatePagination(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
  }

  private emptyEventPage() {
    return of({ data: [], totalElements: 0, totalPages: 0 });
  }

  applyDateFilter() {
    if (this.dateRange.start && this.dateRange.end) {
      this.pageIndex = 0;
      this.refresh();
    }
  }

  clearFilters() {
    this.dateRange.start = null;
    this.dateRange.end = null;
    this.searchEvent = '';
    this.pageIndex = 0;
    this.refresh();
  }
}
