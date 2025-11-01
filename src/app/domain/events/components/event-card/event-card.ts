import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Input, LOCALE_ID, OnDestroy, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

registerLocaleData(localePt);

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, MatTooltipModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' }
  ]
})
export class EventCard implements OnDestroy {
  @Input() eventId!: string;
  @Input() eventTitle!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() date!: Date;

  isLoading = signal(false);

  onCardClick() {
    this.isLoading.set(true);
  }

  ngOnDestroy() {
    this.isLoading.set(false);
  }

  getTooltipText(): string {
    return this.description.replace(/<[^>]*>/g, '').trim();
  }
}
