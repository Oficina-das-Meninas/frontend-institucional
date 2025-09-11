import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-history',
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
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
    },
    { 
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      imagePath: './meninas_reunidas.webp',
      imagePosition: 'image-left'
    },
    { 
      text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      imagePath: './padrinho_icon.png',
      imagePosition: 'image-right'
    }
  ];
}
