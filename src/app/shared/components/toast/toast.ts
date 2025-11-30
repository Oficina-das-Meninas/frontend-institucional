import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-sm">
      @for (toast of toastService.toasts(); track toast.id) {
      <div
        [@toastAnimation]
        (click)="toastService.remove(toast.id)"
        class="flex items-center p-4 rounded-lg shadow-lg border-l-4 cursor-pointer transform transition-all hover:scale-105 backdrop-blur-sm bg-white/90 "
        [ngClass]="{
          'border-green-500 text-green-700': toast.type === 'success',
          'border-red-500 text-red-700 ': toast.type === 'error',
          'border-blue-500 text-blue-700 ': toast.type === 'info',
          'border-yellow-500 text-yellow-700 ': toast.type === 'warning'
        }"
      >
        <div class="mr-3">
          @switch (toast.type) { @case ('success') {
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          } @case ('error') {
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          } @case ('warning') {
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          } @case ('info') {
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          } }
        </div>

        <div class="text-sm font-medium">
          {{ toast.message }}
        </div>
      </div>
      }
    </div>
  `,
  styles: [],
})
export class ToastComponent {
  toastService = inject(ToastService);
}
