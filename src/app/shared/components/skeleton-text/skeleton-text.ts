import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-text',
  templateUrl: './skeleton-text.html',
  standalone: true
})
export class SkeletonText implements OnInit {
  @Input() lines: number = 16;
  @Input() containerClasses: string = '';
  @Input() pattern: 'random' | 'full' = 'random';

  displayLines: string[] = [];

  private randomWidths = ['full', '3/4', '5/6', '4/5', '2/3'];

  ngOnInit() {
    this.generateLines();
  }

  private generateLines() {
    this.displayLines = [];
    for (let i = 0; i < this.lines; i++) {
      if (this.pattern === 'full') {
        this.displayLines.push('full');
      } else {
        const randomIndex = Math.floor(Math.random() * this.randomWidths.length);
        this.displayLines.push(this.randomWidths[randomIndex]);
      }
    }
  }
}
