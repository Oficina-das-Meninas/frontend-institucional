import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instagram-icon',
  standalone: true,
  template: `
    <svg [attr.class]="cssClass" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 2.31494H7C4.23858 2.31494 2 4.55352 2 7.31494V17.3149C2 20.0764 4.23858 22.3149 7 22.3149H17C19.7614 22.3149 22 20.0764 22 17.3149V7.31494C22 4.55352 19.7614 2.31494 17 2.31494Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.0002 11.6848C16.1236 12.517 15.9815 13.367 15.594 14.1138C15.2065 14.8606 14.5933 15.4662 13.8418 15.8444C13.0903 16.2227 12.2386 16.3544 11.408 16.2207C10.5773 16.087 9.80996 15.6948 9.21503 15.0999C8.62011 14.505 8.22793 13.7376 8.09426 12.907C7.9606 12.0763 8.09226 11.2246 8.47052 10.4731C8.84878 9.72161 9.45438 9.1085 10.2012 8.721C10.948 8.3335 11.7979 8.19134 12.6302 8.31475C13.4791 8.44064 14.265 8.83622 14.8719 9.44306C15.4787 10.0499 15.8743 10.8358 16.0002 11.6848Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.5 6.81494H17.51"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class InstagramIconComponent {
  @Input() cssClass: string = 'size-5';
}
