import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselComponent {
  @Input() slides!: string[];
}
