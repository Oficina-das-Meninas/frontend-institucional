import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EventsList } from '../../components/events-list/events-list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { EventPaginator } from '../../components/event-paginator/event-paginator';
import { EventPage } from '../../model/event-page';
import { catchError, Observable, of, tap } from 'rxjs';
import { EventService } from '../../services/event-service';
import { AsyncPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-events',
  imports: [
    EventsList,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinner,
    EventPaginator,
    AsyncPipe,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  events$: Observable<EventPage> | null = null;

  private eventService = inject(EventService);

  pageIndex = 0;
  pageSize = 10;

  ngOnInit() {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.events$ = this.eventService
      .list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(() => {
          return of({ data: [], totalElements: 0, totalPages: 0 });
        })
      );
  }
}
