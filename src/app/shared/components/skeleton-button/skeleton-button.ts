import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-button',
  templateUrl: './skeleton-button.html',
  standalone: true
})
export class SkeletonButton {
  @Input() cssClass: string = '';
}
