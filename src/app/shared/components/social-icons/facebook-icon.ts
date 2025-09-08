import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-facebook-icon',
  standalone: true,
  template: `
    <svg [attr.class]="cssClass" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 2.31494H15C13.6739 2.31494 12.4021 2.84173 11.4645 3.77941C10.5268 4.71709 10 5.98886 10 7.31494V10.3149H7V14.3149H10V22.3149H14V14.3149H17L18 10.3149H14V7.31494C14 7.04972 14.1054 6.79537 14.2929 6.60783C14.4804 6.4203 14.7348 6.31494 15 6.31494H18V2.31494Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class FacebookIconComponent {
  @Input() cssClass: string = 'size-5';
}
