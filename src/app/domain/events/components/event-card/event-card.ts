import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Input, LOCALE_ID } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { marked } from 'marked';

registerLocaleData(localePt);

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, MatTooltipModule, RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' }
  ]
})
export class EventCard {
  @Input() eventId!: string;
  @Input() eventTitle!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() date!: Date;

  getTooltipText(): string {
    const html = marked(this.description) as string;
    return html.replace(/<[^>]*>/g, '').trim();
  }
}
