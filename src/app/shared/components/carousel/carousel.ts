import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {
  @Input() slides!: { path: string; alt: string }[];
  @Input() withTitle: boolean = false;
  @Input() slideClass: string = '';
  @Input() swiperSlideClass: string = '';
  @Input() imgClass: string = '';
  @Input() slidesPerView: number = 0;
  @Input() spaceBetween: number = 30;
  @Input() autoplayDelay: number = 3000;
  @Input() aspectRatio: string = '16 / 10';
  @Input() mobileSlidesFraction: number = 1.1;

  private readonly breakpoints = [
    { width: 2560, slides: 6, slidesPerView: 5.5 },
    { width: 1440, slides: 5, slidesPerView: 4.5 },
    { width: 1920, slides: 4, slidesPerView: 3.9 },
    { width: 1600, slides: 4, slidesPerView: 3.5 },
    { width: 1280, slides: 4, slidesPerView: 2.8 },
    { width: 1024, slides: 4, slidesPerView: 2.2 },
    { width: 768, slides: 3, slidesPerView: 1.5 },
    { width: 0, slides: 3, slidesPerView: 1.1 },
  ];

  ngOnInit() {
    const width = window.innerWidth;
    const slideCount = this.slides.length;

    if (width < 768) {
      this.slidesPerView = Math.min(slideCount, this.mobileSlidesFraction);
      return;
    }

    if (this.slidesPerView === 0) {
      let selectedSlidesPerView = 1.1;

      for (const breakpoint of this.breakpoints) {
        if (width >= breakpoint.width) {
          selectedSlidesPerView = breakpoint.slidesPerView;
          break;
        }
      }

      this.slidesPerView = Math.min(slideCount, selectedSlidesPerView);
    }
  }
}
