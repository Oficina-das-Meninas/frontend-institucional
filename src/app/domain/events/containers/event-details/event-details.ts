import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, ElementRef, inject, LOCALE_ID, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ColorExtractorService } from '../../../../shared/services/color-extractor.service';
import { EventRow } from "../../components/event-row/event-row";
import { Event } from '../../model/event';
import { EventService } from '../../services/event-service';

registerLocaleData(localePt);

@Component({
  selector: 'app-event-details',
  imports: [EventRow, MatButtonModule, DatePipe],
  templateUrl: './event-details.html',
  styleUrl: './event-details.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class EventDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private eventService = inject(EventService);
  private colorExtractor = inject(ColorExtractorService);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  event: Event = {} as Event;

  eventId = this.activatedRoute.snapshot.paramMap.get('id');


  ngOnInit(): void {
    if (this.eventId) {
      this.event = this.eventService.getById(this.eventId);
      this.updateHeaderBackground();
    }
  }

  private async updateHeaderBackground(): Promise<void> {
    if (this.event.previewImageUrl) {
      try {
        const dominantColor = await this.colorExtractor.extractDominantColor(this.event.previewImageUrl);
        const darkerColor = this.colorExtractor.getDarkerVariation(dominantColor);

        this.applyDynamicBackground(dominantColor, darkerColor);
      } catch (error) {
        console.warn('Erro ao extrair cor da imagem, usando cor padrão:', error);
      }
    }
  }

  private applyDynamicBackground(primaryColor: string, secondaryColor: string): void {
    const headerElement = this.elementRef.nativeElement.querySelector('.event-header');

    if (headerElement) {
      const newBackgroundStyle = `
        radial-gradient(circle, transparent 20%, ${primaryColor} 20%, ${primaryColor} 80%, transparent 80%, transparent),
        radial-gradient(circle, transparent 20%, ${primaryColor} 20%, ${primaryColor} 80%, transparent 80%, transparent) 67.5px 67.5px,
        linear-gradient(${secondaryColor} 5.4px, transparent 5.4px) 0 -2.7px,
        linear-gradient(90deg, ${secondaryColor} 5.4px, ${primaryColor} 5.4px) -2.7px 0
      `;

      this.renderer.setStyle(headerElement, '--new-background-color', primaryColor);
      this.renderer.setStyle(headerElement, '--new-background', newBackgroundStyle);
      this.renderer.setStyle(headerElement, '--new-background-size', '135px 135px, 135px 135px, 67.5px 67.5px, 67.5px 67.5px');

      const style = headerElement.style;
      style.setProperty('--new-background-color', primaryColor);
      style.setProperty('--new-background', newBackgroundStyle);
      style.setProperty('--new-background-size', '135px 135px, 135px 135px, 67.5px 67.5px, 67.5px 67.5px');

      setTimeout(() => {
        this.renderer.addClass(headerElement, 'color-extracted');
      }, 50);
    }
  }
}
