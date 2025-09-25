import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AboutSectionPage } from '../../components/about-section-page/about-section-page';

@Component({
  selector: 'app-about',
  imports: [MatButtonModule, MatCardModule, AboutSectionPage],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  previewImagePath = '/meninas_reunidas.webp';
  title = 'Nossa História';
  sections = [
    { 
      text: 'Oficina das Meninas é uma organização não governamental sem fins lucrativos, idealizada por Adélia Bellodi Privato, que tinha o sonho de criar uma instituição para acolher meninas em situação de vulnerabilidade social.',
      imagePath: './meninas_reunidas.webp',
      imagePosition: 'image-left'
    },
    { 
      text: 'Oficina das Meninas é uma organização não governamental sem fins lucrativos, idealizada por Adélia Bellodi Privato, que tinha o sonho de criar uma instituição para acolher meninas em situação de vulnerabilidade social.',
      imagePath: './imagem2.webp',
      imagePosition: 'image-right'
    }
  ];
}