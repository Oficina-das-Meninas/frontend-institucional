import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CarouselComponent } from '../../../../shared/components/carousel/carousel';
import { EventService } from '../../../events/services/event-service';
import { PartnerService } from '../../../partners/services/partner-service';
import { FlowerStat } from '../../components/flower-stat/flower-stat';
import { SupportCard } from '../../components/support-card/support-card';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardModule, FlowerStat, SupportCard, CarouselComponent, RouterLink, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  eventImages$: Observable<{ path: string; alt: string }[]> | null = null;
  partnerImages$: Observable<{ path: string; alt: string }[]> | null = null;
  partnerCount: number = 0;

  yearOfFoundation = new Date('03-23-2002').getFullYear();
  today = new Date().getFullYear();

  private eventService = inject(EventService);
  private partnerService = inject(PartnerService);

  ngOnInit() {
    this.eventImages$ = this.eventService.list({}).pipe(
      map(events =>
        events.data.map(event => ({
          path: event.previewImageUrl,
          alt: 'Evento ' + event.title,
        }))
      )
    );

    this.partnerImages$ = this.partnerService.list().pipe(
      map(partners => {
        this.partnerCount = partners.totalElements;
        return partners.data.map(partner => ({
          path: partner.previewImageUrl,
          alt: partner.name,
        }));
      })
    );
  }
}
