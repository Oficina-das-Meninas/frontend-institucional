import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
}
