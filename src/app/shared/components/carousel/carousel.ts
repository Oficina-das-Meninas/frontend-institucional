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
  @Input() slideClass: string = '';
  @Input() imgClass: string = '';
  @Input() spaceBetween: number = 30;
  @Input() autoplayDelay: number = 5000;

  slidesPerView: number | "auto" = "auto";

  ngOnInit() {
    if(window.innerWidth > 768) {
      this.slidesPerView = 3;
    } else if (window.innerWidth >= 1024) {
      this.slidesPerView = 4;
    } else if (window.innerWidth >= 1280) {
      this.slidesPerView = 5;
    }
  }
}
