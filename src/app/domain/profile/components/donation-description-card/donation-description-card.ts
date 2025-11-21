import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DonationDescriptionCardType } from '../../model/donation-description';

@Component({
  selector: 'app-donation-description-card',
  imports: [MatExpansionModule, CurrencyPipe],
  templateUrl: './donation-description-card.html',
  styleUrl: './donation-description-card.scss',
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
