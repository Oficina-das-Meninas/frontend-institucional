import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-image',
  templateUrl: './skeleton-image.html',
  standalone: true
})
export class SkeletonImage {
  @Input() width: string = '96';
  @Input() height: string = '96';
  @Input() additionalClasses: string = '';
}
