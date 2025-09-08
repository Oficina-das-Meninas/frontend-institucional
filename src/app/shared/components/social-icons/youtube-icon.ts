import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-youtube-icon',
  standalone: true,
  template: `
    <svg [attr.class]="cssClass" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.5401 6.73494C22.4213 6.26035 22.1794 5.82551 21.8387 5.47435C21.4981 5.12318 21.0708 4.86813 20.6001 4.73494C18.8801 4.31494 12.0001 4.31494 12.0001 4.31494C12.0001 4.31494 5.12008 4.31494 3.40008 4.77494C2.92933 4.90813 2.50206 5.16318 2.16143 5.51435C1.8208 5.86551 1.57887 6.30035 1.46008 6.77494C1.1453 8.5205 0.991319 10.2913 1.00008 12.0649C0.988863 13.852 1.14285 15.6362 1.46008 17.3949C1.59104 17.8548 1.83839 18.2731 2.17823 18.6094C2.51806 18.9458 2.9389 19.1888 3.40008 19.3149C5.12008 19.7749 12.0001 19.7749 12.0001 19.7749C12.0001 19.7749 18.8801 19.7749 20.6001 19.3149C21.0708 19.1818 21.4981 18.9267 21.8387 18.5755C22.1794 18.2244 22.4213 17.7895 22.5401 17.3149C22.8524 15.5825 23.0064 13.8253 23.0001 12.0649C23.0113 10.2779 22.8573 8.49364 22.5401 6.73494Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.75 15.3349L15.5 12.0649L9.75 8.79492V15.3349Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class YoutubeIconComponent {
  @Input() cssClass: string = 'size-5';
}
