import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-history',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  yearOfFoundation = new Date('03-23-2002').getFullYear();
  today = new Date().getFullYear();
}
