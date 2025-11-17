import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { DonationDescriptionCardType } from '../../model/donation-description';

@Component({
  selector: 'app-donation-description-card',
  imports: [MatSliderModule, MatExpansionModule, CurrencyPipe],
  templateUrl: './donation-description-card.html',
  styleUrl: './donation-description-card.scss',
})
export class DonationDescriptionCard {
  @Input() donation!: DonationDescriptionCardType;
}
