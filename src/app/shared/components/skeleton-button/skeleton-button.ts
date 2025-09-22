import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-button',
  templateUrl: './skeleton-button.html',
  standalone: true
})
export class SkeletonButton {
  @Input() height: string = '10';
  @Input() width: string = '32';
}