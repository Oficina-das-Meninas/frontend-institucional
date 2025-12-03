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
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../shared/services/auth/auth';
import { AlertDialogSubscription } from '../../../donation/components/alert-dialog-subscription/alert-dialog-subscription';

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
  dialog = inject(MatDialog);
  authService = inject(AuthService);

  showCustomDonationInput = false;

  chooseAction() {
    if (!this.showCustomDonationInput) {
      this.showInputValue();
    } else {
      this.validateAndRedirect();
    }
  }

  handlePlanClick(value: number) {
    this.checkAuthAndRedirect(value);
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

  validateAndRedirect() {
    const rawValue = this.inputValue().replace(/\./g, '').replace(',', '.');
    const numericValue = Number(rawValue);

    if (numericValue > 0) {
      this.checkAuthAndRedirect(numericValue);
    }
  }

  checkAuthAndRedirect(value: number) {
    this.authService.checkSession().subscribe((hasSession) => {
      if (!hasSession) {
        this.dialog.open(AlertDialogSubscription, {
          autoFocus: false,
        });
      } else {
        this.navigateToDonation(value);
      }
    });
  }

  navigateToDonation(value: number) {
    this.router.navigate(['/faca-sua-doacao'], {
      queryParams: { valor: value },
    });
  }

  showInputValue() {
    this.showCustomDonationInput = !this.showCustomDonationInput;
  }
}
