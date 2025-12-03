import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  private readonly ongPhoneNumber = '551633226232';

  getPhoneNumber(): string {
    return this.ongPhoneNumber;
  }

  getPhoneNumberFormatted(): string {
    return '(16) 3322-6232';
  }

  getWhatsappLink(message?: string): string {
    const encodedMessage = message ? encodeURIComponent(message) : "";
    const baseUrl = 'https://wa.me/';
    return `${baseUrl}${this.ongPhoneNumber}?text=${encodedMessage}`;
  }

  getMobileWhatsappLink(message?: string): string {
    const encodedMessage = message ? encodeURIComponent(message) : "";
    const baseUrl = 'whatsapp://send';
    return `${baseUrl}?phone=${this.ongPhoneNumber}&text=${encodedMessage}`;
  }

  openWhatsapp(message?: string): void {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const link = isMobile ? this.getMobileWhatsappLink(message) : this.getWhatsappLink(message);
    window.open(link, isMobile ? '_self' : '_blank');
  }
}
