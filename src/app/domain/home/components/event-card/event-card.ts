import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Input, LOCALE_ID } from '@angular/core';

registerLocaleData(localePt);

@Component({
  selector: 'app-event-card',
  imports: [DatePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' }
  ]
})
export class EventCard {
  @Input() title: string = 'Título do Evento';
  @Input() description: string = 'Descrição do Evento';
  @Input() imageUrl: string = 'https://picsum.photos/400';
  @Input() date: Date = new Date();
}
