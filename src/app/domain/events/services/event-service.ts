import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, first, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly API_URL = `${environment.apiUrl}/events`;
  private httpClient = inject(HttpClient);

  getById(id: string): Event {
    return {
      id: '1',
      title: 'Ferroviária',
          description:
            'Após o jogo contra o Botafogo na Fonte Luminosa, a Ferroviária realizou a entrega simbólica de um cheque no valor de R$ 57.636,60',
          previewImageUrl: './meninas_reunidas.webp',
          eventDate: new Date('2023-02-11T19:30:00'),
          location: 'Estádio Fonte Luminosa - Araraquara, SP',
          amount: 57636.6,
          urlToPlatform: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        };
  }

  list(page = 0, pageSize = 10) {
    return of({
      data: [
        {
          id: '1',
          title: 'Ferroviária',
          description:
            'Após o jogo contra o Botafogo na Fonte Luminosa, a Ferroviária realizou a entrega simbólica de um cheque no valor de R$ 57.636,60',
          previewImageUrl: './evento-ferroviaria.webp',
          eventDate: new Date('2023-02-11'),
        },
        {
          id: '2',
          title: '3ª Corrida da Oficina',
          description:
            'Uma manhã de domingo incrível, marcada pela presença de 360 pessoas que, através da atividade física, ajudaram as meninas do Centro Cultural.',
          previewImageUrl: './evento-corrida.webp',
          eventDate: new Date('2023-07-05'),
        },
        {
          id: '3',
          title: 'Espetáculo Amazônias',
          description: 'Nossas meninas foram  convidadas para assistir o espetáculo Amazônias.',
          previewImageUrl: './evento-amazonias.webp',
          eventDate: new Date('2023-08-28'),
        },
      ],
      totalElements: 3,
      totalPages: 1,
    }).pipe(first(), delay(1000));
    // return this.httpClient
    //   .get<EventPage>(this.API_URL, {
    //     params: {
    //       page: page,
    //       size: pageSize,
    //     },
    //   })
    //   .pipe(first());
  }
}
