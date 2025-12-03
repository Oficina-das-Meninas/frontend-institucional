import { Component, inject } from '@angular/core';
import { ContactItemComponent } from '../contact-item/contact-item';
import { WhatsappService } from '../../../../services/whatsapp';

@Component({
  selector: 'app-contact-info',
  imports: [ContactItemComponent],
  standalone: true,
  templateUrl: './contact-info.html',
})
export class ContactInfoComponent {
  whatsappService = inject(WhatsappService);
  openWhatsapp = () => this.whatsappService.openWhatsapp("Olá! Gostaria de saber mais informações.");
  whatsappNumber = this.whatsappService.getPhoneNumberFormatted();
}
