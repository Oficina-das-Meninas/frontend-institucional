import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-support-card',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './support-card.html',
  styleUrl: './support-card.scss'
})
export class SupportCard {
  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() buttonText!: string;
  @Input() link!: string;
}
