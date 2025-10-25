import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DonationPlanCard } from '../../components/donation-plan-card/donation-plan-card';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { normalizeCurrencyValue } from '../../../../shared/utils/value-utils';

@Component({
  selector: 'app-donation-plans',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DonationPlanCard,
    NgxMaskDirective,
    RouterLink,
  ],
  templateUrl: './donation-plans.html',
  styleUrl: './donation-plans.scss',
})
export class DonationPlans {
  @ViewChild('donationInput') donationInput!: ElementRef<HTMLElement>;
  @ViewChild('btnCustomDonation')
  btnCustomDonation!: ElementRef<HTMLButtonElement>;
  inputValue = signal('');
  router = inject(Router);

  showCustomDonationInput = false;

  chooseAction() {
    if (!this.showCustomDonationInput) {
      this.showInputValue();
    } else {
      this.redirectToDonationPage();
    }
  }
  redirectToDonationPage() {
    const value = normalizeCurrencyValue(this.inputValue(), true);

    this.router.navigate(['/faca-sua-doacao'], {
      queryParams: { valor: value },
    });
  }

  showInputValue() {
    this.showCustomDonationInput = !this.showCustomDonationInput;
  }
}
