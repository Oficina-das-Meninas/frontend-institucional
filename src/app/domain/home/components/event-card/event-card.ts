import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {
  @Input() title: string = 'Título do Evento';
  @Input() description: string = 'Descrição do Evento';
  @Input() imageUrl: string = 'https://picsum.photos/400';
  @Input() date: Date = new Date();
}
