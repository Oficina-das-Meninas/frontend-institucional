import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-section-page',
  imports: [],
  templateUrl: './about-section-page.html',
  styleUrl: './about-section-page.scss'
})
export class AboutSectionPage {
  @Input() section!: {
    text: string;
    imagePath: string;
    imagePosition: string;
  };
}