import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, ElementRef, inject, LOCALE_ID, OnInit, Renderer2, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../../../../../environments/environment.development';
import { SkeletonImage } from '../../../../shared/components/skeleton-image/skeleton-image';
import { ColorExtractorService } from '../../../../shared/services/color-extractor.service';
import { EventInfo } from '../../components/event-info/event-info';
import { Event } from '../../model/event';

registerLocaleData(localePt);

@Component({
  selector: 'app-event-details',
  imports: [EventInfo, MatButtonModule, DatePipe, MatProgressSpinnerModule, SkeletonImage, MarkdownModule, MatTooltip],
  templateUrl: './event-details.html',
  styleUrl: './event-details.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class EventDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private colorExtractor = inject(ColorExtractorService);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  private readonly BUCKET_URL = `${environment.bucketUrl}/`;

  event = signal<Event | null>(null);
  previewImageLoaded = signal(false);
  partnersImageLoaded = signal(false);

  eventId = this.activatedRoute.snapshot.paramMap.get('id');

  async ngOnInit() {
    const resolvedEvent = this.activatedRoute.snapshot.data['event'] as Event;

    resolvedEvent.previewImageUrl = this.BUCKET_URL + resolvedEvent.previewImageUrl;
    resolvedEvent.partnersImageUrl = resolvedEvent.partnersImageUrl ? this.BUCKET_URL + resolvedEvent.partnersImageUrl : undefined;

    this.event.set(resolvedEvent);
    await this.updateHeaderBackground();
  }

  isEventPast(event: Event): boolean {
    if (!event || !event.eventDate) {
      return false;
    }
    const now = new Date();
    const eventDate = new Date(event.eventDate);
    return eventDate < now;
  }

  onPreviewImageLoad() {
    this.previewImageLoaded.set(true);
  }

  onPartnersImageLoad() {
    this.partnersImageLoaded.set(true);
  }

  private async updateHeaderBackground(): Promise<void> {
    if (this.event()?.previewImageUrl) {
      try {
        const dominantColor = await this.colorExtractor.extractDominantColor(this.event()!.previewImageUrl);
        const darkerColor = this.colorExtractor.getDarkerVariation(dominantColor);

        this.applyDynamicBackground(dominantColor, darkerColor);
        const headerElement = this.elementRef.nativeElement.querySelector('.event-header');
        if (headerElement) {
          this.renderer.addClass(headerElement, 'color-extracted');
        }
      } catch (error) {
        console.warn('Erro ao extrair cor da imagem, usando cor padrão:', error);
        const headerElement = this.elementRef.nativeElement.querySelector('.event-header');
        if (headerElement) {
          this.renderer.addClass(headerElement, 'color-extracted');
        }
      }
    } else {
      const headerElement = this.elementRef.nativeElement.querySelector('.event-header');
      if (headerElement) {
        this.renderer.addClass(headerElement, 'color-extracted');
      }
    }
  }

  private applyDynamicBackground(primaryColor: string, secondaryColor: string): void {
    const headerElement = this.elementRef.nativeElement.querySelector('.event-header');

    const isLightColor = this.colorExtractor.isLightColor(primaryColor);
    const textColor = isLightColor ? 'black' : 'white';

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
      style.setProperty('--new-text-color', textColor);

      this.renderer.setStyle(headerElement, '--new-text-color', textColor);
    }
  }
}
