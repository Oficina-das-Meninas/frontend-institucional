import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-image',
  templateUrl: './skeleton-image.html',
  standalone: true
})
export class SkeletonImage {
  @Input() imageCss: string = '';
}
