import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-pin-icon',
  standalone: true,
  template: `
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1528_1197)">
        <path
          d="M14.25 6.98145C14.25 11.6481 8.25 15.6481 8.25 15.6481C8.25 15.6481 2.25 11.6481 2.25 6.98145C2.25 5.39015 2.88214 3.86402 4.00736 2.7388C5.13258 1.61359 6.6587 0.981445 8.25 0.981445C9.8413 0.981445 11.3674 1.61359 12.4926 2.7388C13.6179 3.86402 14.25 5.39015 14.25 6.98145Z"
          stroke="#BA005C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.25 8.98145C9.35457 8.98145 10.25 8.08601 10.25 6.98145C10.25 5.87688 9.35457 4.98145 8.25 4.98145C7.14543 4.98145 6.25 5.87688 6.25 6.98145C6.25 8.08601 7.14543 8.98145 8.25 8.98145Z"
          stroke="#BA005C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1528_1197">
          <rect width="16" height="16" fill="white" transform="translate(0.25 0.314941)" />
        </clipPath>
      </defs>
    </svg>
  `,
})
export class FacebookIconComponent {
  @Input() cssClass: string = 'size-5';
}
