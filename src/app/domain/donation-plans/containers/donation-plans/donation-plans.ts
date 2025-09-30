import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DonationPlanCard } from '../../components/donation-plan-card/donation-plan-card';

@Component({
  selector: 'app-donation-plans',
  imports: [MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            DonationPlanCard],
  templateUrl: './donation-plans.html',
  styleUrl: './donation-plans.scss',
  encapsulation: ViewEncapsulation.None
})
export class DonationPlans {
  @ViewChild('donationInput') donationInput!: ElementRef<HTMLElement>;
  @ViewChild('btnCustomDonation') btnCustomDonation!: ElementRef<HTMLButtonElement>;

  showCustomDonationInput = false;

  showInputValue() {
    this.showCustomDonationInput = !this.showCustomDonationInput;
  }
}
