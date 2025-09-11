import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-history-section-page',
  imports: [ CommonModule ],
  templateUrl: './history-section-page.html',
  styleUrl: './history-section-page.scss'
})
export class HistorySectionPage {
  @Input() section!: {
    text: string;
    imagePath: string;
    imagePosition: string;
  };
}