import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { DonationService } from '../../service/donation.service';
import { cpfValidator } from '../../../../shared/validators/document.validator';
import { FormHelperService } from '../../../../shared/services/form/form-helper-service';

@Component({
  selector: 'app-make-your-donation',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
    MatButtonModule,
    CommonModule,
    FormsModule,
    RouterLink,
    MatRadioModule,
    MatIconModule,
  ],
  templateUrl: './make-your-donation.html',
  styleUrls: ['./make-your-donation.scss'],
})
export class MakeYourDonation implements AfterViewInit, OnInit {
  selectedAmount: number | null = null;
  userAuthenticated = false;
  form!: FormGroup;
  donationService = inject(DonationService);
  route = inject(ActivatedRoute);
  formHelper = inject(FormHelperService);

  constructor() {
    this.form = new FormGroup({
      name: new FormControl<string>(null!, [Validators.required]),
      email: new FormControl<string>(null!, [
        Validators.required,
        Validators.email,
      ]),
      document: new FormControl<string>(null!, [
        Validators.required,
        cpfValidator(),
      ]),
      phone: new FormControl<string>(null!, [Validators.required]),
      amount: new FormControl<number | null>(null, [Validators.min(1)]),
      frequency: new FormControl<string>('once', [Validators.required]),
    });
  }

  ngOnInit() {
    this.form.get('amount')?.valueChanges.subscribe((val) => {
      if (val !== null && val !== '' && Number(val) > 0) {
        this.selectedAmount = null;
      }
    });
  }

  ngAfterViewInit() {
    const valor = this.route.snapshot.queryParamMap.get('valor');

    if (valor) {
      this.selectedAmount = null;
      this.form.patchValue({ amount: valor });
    }
  }

  setSelectedAmount(value: number) {
    this.selectedAmount = value;
    this.form.patchValue({ amount: null });
    this.form.get('amount')?.markAsPristine();
    this.form.get('amount')?.markAsUntouched();
  }

  onAmountInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    while (value.length < 3) value = '0' + value;

    const inteiro = value.slice(0, -2);
    const decimais = value.slice(-2);

    const newValue = `${inteiro},${decimais}`;

    input.value = newValue;
    this.form.get('amount')?.setValue(newValue, { emitEvent: false });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const rawValue = this.form.getRawValue();

    const amountToSend = rawValue.amount ?? this.selectedAmount;

    if (!amountToSend || amountToSend <= 0) {
      this.form.get('amount')?.setErrors({ required: true });
      return;
    }

    const donationRequest = {
      donor: {
        ...rawValue,
        phone: {
          country: '+55',
          area: rawValue.phone.substring(0, 2),
          number: rawValue.phone.substring(2).replace(/\D/g, ''),
        },
      },
      donation: {
        value: amountToSend * 100,
        isRecurring: rawValue.frequency === 'monthly',
      },
    };

    this.donationService.sendDonation(donationRequest).subscribe({
      next: (response) => {
        window.open(response.checkoutLink, '_blank');
      },
      error: (error) => {
        console.error('Error processing donation:', error);
      },
    });
  }
}
