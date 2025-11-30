import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common'; // Adicionado DatePipe
import { Component, Input, LOCALE_ID } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DonationDescriptionCardType } from '../../model/donation-description';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-donation-description-card',
  imports: [MatExpansionModule, CurrencyPipe, DatePipe],
  templateUrl: './donation-description-card.html',
  styleUrl: './donation-description-card.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class DonationDescriptionCard {
  @Input() donation!: DonationDescriptionCardType;

  paymentLabels: Record<string, string> = {
    CREDIT_CARD: 'Cartão de Crédito',
    PIX: 'Pix',
    DEBIT_CARD: 'Cartão de Débito',
    BOLETO: 'Boleto',
  };
}
