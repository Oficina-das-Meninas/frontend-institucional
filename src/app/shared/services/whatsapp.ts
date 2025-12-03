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
    const baseUrl = 'https://web.whatsapp.com/send';
    const params = new URLSearchParams({
      phone: this.ongPhoneNumber,
      ...(message && { text: message }),
    });
    return `${baseUrl}?${params.toString()}`;
  }

  getMobileWhatsappLink(message?: string): string {
    const baseUrl = 'whatsapp://send';
    const params = new URLSearchParams({
      phone: this.ongPhoneNumber,
      ...(message && { text: message }),
    });
    return `${baseUrl}?${params.toString()}`;
  }

  openWhatsapp(message?: string): void {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const link = isMobile ? this.getMobileWhatsappLink(message) : this.getWhatsappLink(message);
    window.open(link, isMobile ? '_self' : '_blank');
  }
}
