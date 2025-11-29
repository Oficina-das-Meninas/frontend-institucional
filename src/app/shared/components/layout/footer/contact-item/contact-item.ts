import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-item',
  imports: [MatIconModule],
  standalone: true,
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.scss',
})
export class ContactItemComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() link: string = '';
}
