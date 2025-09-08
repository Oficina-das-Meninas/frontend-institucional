import { Component } from '@angular/core';
import { ContactItemComponent } from '../contact-item/contact-item';

@Component({
  selector: 'app-contact-info',
  imports: [ContactItemComponent],
  standalone: true,
  templateUrl: './contact-info.html',
})
export class ContactInfoComponent {}
