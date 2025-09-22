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

  /*
   {
      id: '1',
      title: 'Ferroviária',
          description:
            `Dia 11/2/23, após o jogo contra o Botafogo na Fonte Luminosa, a Ferroviária realizou a entrega simbólica de um cheque ao projeto Oficina das meninas. O cheque, no valor de R$57.636,60, corresponde a 10% da renda líquida gerada na partida entre a ferroviária e São Paulo pela segunda rodada do campeonato paulista de 2023.

            Esta é a primeira ação do projeto “Esthrelinha!, que a Ferroviária inaugurou neste ano e visa arrecadar fundos e criar laços com entidades sociais da cidade e microrregião que atuam na resolução de demandas da sociedade. O nome é uma homenagem ao apelido da eterna guerreirinha Esther Martins, que perdeu a vida no final de 2022. A entrega do cheque foi realizada pelos pais da Esther: Maria Aparecida e Jeferson. Fabíola Cristiane de Souza Ramos, Presidente do Projeto “Oficina das meninas”, falou sobre o apoio da Locomotiva. “O apoio da Ferroviária ao Projeto Oficina das meninas é de grande valia, pois graças a essas parcerias que conseguimos promover autonomia e transformação em nossas meninas, formando cidadãs e chefes de família, descontruindo exemplos de violência contra a mulher, que se perpetua pelas gerações, incluindo gravidez precoce.”`,
          previewImageUrl: './evento-ferroviaria.webp',
          eventDate: new Date('2023-02-11T19:30:00'),
          location: 'Estádio Fonte Luminosa - Araraquara, SP',
          amount: 57636.6,
          urlToPlatform: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        };
   */

  async getById(id: string): Promise<Event> {
    const event = {
      id: '1',
      title: 'Ferroviária',
          description:
            `Dia 11/2/23, após o jogo contra o Botafogo na Fonte Luminosa, a Ferroviária realizou a entrega simbólica de um cheque ao projeto Oficina das meninas. O cheque, no valor de R$57.636,60, corresponde a 10% da renda líquida gerada na partida entre a ferroviária e São Paulo pela segunda rodada do campeonato paulista de 2023.

            Esta é a primeira ação do projeto “Esthrelinha!, que a Ferroviária inaugurou neste ano e visa arrecadar fundos e criar laços com entidades sociais da cidade e microrregião que atuam na resolução de demandas da sociedade. O nome é uma homenagem ao apelido da eterna guerreirinha Esther Martins, que perdeu a vida no final de 2022. A entrega do cheque foi realizada pelos pais da Esther: Maria Aparecida e Jeferson. Fabíola Cristiane de Souza Ramos, Presidente do Projeto “Oficina das meninas”, falou sobre o apoio da Locomotiva. “O apoio da Ferroviária ao Projeto Oficina das meninas é de grande valia, pois graças a essas parcerias que conseguimos promover autonomia e transformação em nossas meninas, formando cidadãs e chefes de família, descontruindo exemplos de violência contra a mulher, que se perpetua pelas gerações, incluindo gravidez precoce.”`,
          previewImageUrl: './evento-ferroviaria.webp',
          eventDate: new Date('2023-02-11T19:30:00'),
          location: 'Estádio Fonte Luminosa - Araraquara, SP',
          amount: 57636.6,
          urlToPlatform: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        };

    return new Promise((resolve) => {
      setTimeout(() => resolve(event as Event), 1000);
    });
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
