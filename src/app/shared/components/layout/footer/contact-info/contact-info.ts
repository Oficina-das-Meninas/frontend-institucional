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
  whatsappLink = this.whatsappService.getWhatsappLink();
  whatsappNumber = this.whatsappService.getPhoneNumberFormatted();
}
