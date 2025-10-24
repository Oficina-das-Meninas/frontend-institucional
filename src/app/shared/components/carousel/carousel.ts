import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent {
  @Input() slides!: string[];
  @Input() slideClass: string = '';
  @Input() imgClass: string = '';
  @Input() slidesPerView: number | 'auto' = 'auto';
  @Input() spaceBetween: number = 30;
  @Input() autoplayDelay: number = 5000;
  @Input() aspectRatio: string = '16 / 10';

  private readonly breakpoints = [
    { width: 1920, slides: 4, slidesPerView: 4.7 },
    { width: 1600, slides: 4, slidesPerView: 3.5 },
    { width: 1280, slides: 4, slidesPerView: 2.8 },
    { width: 1024, slides: 4, slidesPerView: 2.2 },
    { width: 768, slides: 3, slidesPerView: 1.5 },
    { width: 0, slides: 3, slidesPerView: 1.1 },
  ];

  ngOnInit() {
    const width = window.innerWidth;
    const slideCount = this.slides.length;

    if (width < 768 ) {
      this.slidesPerView = 1;
    }

    for (const breakpoint of this.breakpoints) {
      if (width > breakpoint.width && slideCount > breakpoint.slides) {
        this.slidesPerView = breakpoint.slidesPerView;
        break;
      }
    }


  }
}
