import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { catchError, Observable, of, tap } from 'rxjs';
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
  ],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  events$: Observable<EventPage> | null = null;

  private eventService = inject(EventService);

  pageIndex = 0;
  pageSize = 10;

  searchInput = '';

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
