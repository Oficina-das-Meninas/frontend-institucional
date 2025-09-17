import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Input, LOCALE_ID } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

registerLocaleData(localePt);

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, MatTooltipModule],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' }
  ]
})
export class EventCard {
  @Input() eventTitle!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() date!: Date;
}
