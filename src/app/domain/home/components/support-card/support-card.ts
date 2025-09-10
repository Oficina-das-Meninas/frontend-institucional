import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-support-card',
  imports: [MatButtonModule],
  templateUrl: './support-card.html',
  styleUrl: './support-card.scss'
})
export class SupportCard {
  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() buttonText!: string;
}
