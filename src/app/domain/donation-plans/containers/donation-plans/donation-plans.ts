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

@Component({
  selector: 'app-donation-plans',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DonationPlanCard,
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

  formatCurrency(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (!value) {
      this.inputValue.set('');
      return;
    }

    const numericValue = Number(value) / 100;
    const formatted = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    this.inputValue.set(formatted);
  }

  redirectToDonationPage() {
    const rawValue = this.inputValue().replace(/\./g, '').replace(',', '.');

    this.router.navigate(['/faca-sua-doacao'], {
      queryParams: { valor: rawValue },
    });
  }

  showInputValue() {
    this.showCustomDonationInput = !this.showCustomDonationInput;
  }
}
