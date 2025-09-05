import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselComponent {
  @Input() slides: { id: number; img: string }[] = [
    { id: 1, img: 'imagem1.webp' },
    { id: 2, img: 'imagem2.webp' },
    { id: 3, img: 'imagem3.webp' }
  ];
}
