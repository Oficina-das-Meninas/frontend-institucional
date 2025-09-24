import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, first, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly API_URL = `${environment.apiUrl}/events`;
  private httpClient = inject(HttpClient);

  getById(id: string): Observable<Event> {
  return this.httpClient.get<Event>(`${this.API_URL}/${id}`).pipe(first());
}

//    getById(id: string): Promise<Event> --- IGNORE ---
//     const event = {
//       id: '1',
//       title: 'Ferroviária',
//       description: `## Entrega de Cheque ao Projeto Oficina das Meninas

// **Data**: 11/02/2023
// **Local**: Fonte Luminosa, após o jogo contra o Botafogo

// ### Detalhes da Entrega

// A Ferroviária realizou a entrega simbólica de um cheque no valor de **R$57.636,60** ao **Projeto Oficina das Meninas**. Esse valor corresponde a **10% da renda líquida** gerada pela partida entre Ferroviária e São Paulo, válida pela segunda rodada do Campeonato Paulista de 2023.

// ### Projeto "Esthrelinha"

// Esta é a **primeira ação** do projeto **"Esthrelinha!"**, lançado pela Ferroviária em 2023. O objetivo do projeto é arrecadar fundos e criar laços com entidades sociais da cidade e microrregião, que atuam na resolução de demandas sociais. O nome do projeto é uma homenagem à **Esther Martins**, eterna guerreirinha da Ferroviária, que infelizmente perdeu a vida no final de 2022.

// ### Ato de Entrega

// A entrega do cheque foi realizada pelos pais de Esther: **Maria Aparecida** e **Jeferson**.

// ### Depoimento

// **Fabíola Cristiane de Souza Ramos**, Presidente do Projeto **"Oficina das Meninas"**, falou sobre o apoio da Ferroviária:

// > “O apoio da Ferroviária ao Projeto Oficina das Meninas é de grande valia, pois, graças a essas parcerias, conseguimos promover autonomia e transformação em nossas meninas, formando cidadãs e chefes de família, desconstruindo exemplos de violência contra a mulher, que se perpetua pelas gerações, incluindo a gravidez precoce.”
// `,
//       previewImageUrl: './evento-ferroviaria.webp',
//       eventDate: new Date('2023-02-11T19:30:00'),
//       location: 'Estádio Fonte Luminosa - Araraquara, SP',
//       amount: 57636.6,
//       urlToPlatform: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
//     };

//     return new Promise(resolve => {
//       setTimeout(() => resolve(event as Event), 1000);
//     });
//  }

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
