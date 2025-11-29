import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { DonationService } from '../../service/donation.service';
import { cpfValidator } from '../../../../shared/validators/document.validator';
import { FormHelperService } from '../../../../shared/services/form/form-helper-service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { environment } from '../../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogSubscription } from '../../components/alert-dialog-subscription/alert-dialog-subscription';
import { phoneValidator } from '../../../../shared/validators/phone.validator';
import { UserService } from '../../../../domain/user/services/user';
import { UserResponse } from '../../../user/model/user-models';

function minCurrencyValue(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const numericValue = Number(
      control.value.toString().replace(/\./g, '').replace(',', '.')
    );
    return numericValue >= min ? null : { min: { min, actual: numericValue } };
  };
}

@Component({
  selector: 'app-make-your-donation',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatButtonModule,
    CommonModule,
    FormsModule,
    RouterLink,
    MatRadioModule,
    MatIconModule,
    NgxCaptchaModule,
  ],
  templateUrl: './make-your-donation.html',
  styleUrls: ['./make-your-donation.scss'],
})
export class MakeYourDonation implements AfterViewInit, OnInit {
  selectedAmount: number | null = null;
  captchaKey = environment.captchaSiteKey;

  userAuthenticated = false;
  currentUser = signal<UserResponse | null>(null);

  form!: FormGroup;

  donationService = inject(DonationService);
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  formHelper = inject(FormHelperService);
  readonly dialog = inject(MatDialog);

  loadingRequest = false;

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
      phone: new FormControl<string>(null!, [
        Validators.required,
        phoneValidator(),
      ]),
      amount: new FormControl<string | null>(null, [minCurrencyValue(1)]),
      frequency: new FormControl<string>('once', [Validators.required]),
      recaptcha: new FormControl<string>(null!, [Validators.required]),
    });
  }

  ngOnInit() {
    this.checkUserSession();

    this.form.get('amount')?.valueChanges.subscribe((val) => {
      const numericVal = val
        ? Number(val.replace(/\./g, '').replace(',', '.'))
        : 0;
      if (val !== null && val !== '' && numericVal > 0) {
        this.selectedAmount = null;
      }
    });
  }

  ngAfterViewInit() {
    const valor = this.route.snapshot.queryParamMap.get('valor');

    if (valor) {
      this.selectedAmount = null;
      const formatted = Number(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      this.form.patchValue({ amount: formatted });
    }
  }

  formatCurrency(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (!value) {
      this.form.get('amount')?.setValue(null);
      return;
    }

    const numericValue = Number(value) / 100;

    const formatted = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    this.form.get('amount')?.setValue(formatted);
  }

  checkUserSession() {
    this.userService.getInfoLoggedUser().subscribe({
      next: (response) => {
        if (response.data) {
          this.userAuthenticated = true;
          this.currentUser.set(response.data);

          this.form.patchValue({
            name: response.data.name,
            email: response.data.email,
            document: response.data.document,
            phone: response.data.phone,
          });
        }
      },
      error: () => {
        this.userAuthenticated = false;
        this.currentUser.set(null);
      },
    });
  }

  setSelectedAmount(value: number) {
    const currentString = this.form.get('amount')?.value || '0';
    const currentAmount = Number(
      currentString.toString().replace(/\./g, '').replace(',', '.')
    );

    const newAmount = currentAmount + value;

    const formatted = newAmount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    this.form.patchValue({ amount: formatted });
    this.selectedAmount = null;
    this.form.get('amount')?.markAsPristine();
    this.form.get('amount')?.markAsUntouched();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const rawValue = this.form.getRawValue();

    let amountToSend = 0;
    if (rawValue.amount) {
      amountToSend = Number(
        rawValue.amount.toString().replace(/\./g, '').replace(',', '.')
      );
    } else if (this.selectedAmount) {
      amountToSend = this.selectedAmount;
    }

    if (!amountToSend || amountToSend <= 0) {
      this.form.get('amount')?.setErrors({ required: true });
      return;
    }

    const rawPhone = rawValue.phone ? rawValue.phone.replace(/\D/g, '') : '';
    const formattedPhone = '+55' + rawPhone;

    const userId = this.currentUser()?.id ?? '';

    const donationRequest = {
      donor: {
        name: rawValue.name,
        email: rawValue.email,
        document: rawValue.document,
        id: userId,
        phone: formattedPhone,
      },
      donation: {
        value: amountToSend,
        isRecurring: rawValue.frequency === 'monthly',
      },
      captchaToken: rawValue.recaptcha,
    };

    this.loadingRequest = true;

    this.donationService.sendDonation(donationRequest).subscribe({
      next: (response) => {
        window.location.href = response.data.checkoutLink;
      },
      error: (error) => {
        console.error('Error processing donation:', error);
        this.loadingRequest = false;
      },
      complete: () => {
        this.loadingRequest = false;
      },
    });
  }

  handleReset() {
    this.form.get('recaptcha')?.setValue(null);
  }

  handleExpire() {
    this.form.get('recaptcha')?.setValue(null);
  }

  handleLoad() {
    this.form.get('recaptcha')?.setValue(null);
  }

  handleSuccess(event: unknown) {
    this.form.get('recaptcha')?.setValue(event);
  }

  openDialog() {
    if (!this.userAuthenticated) {
      const modalRef = this.dialog.open(AlertDialogSubscription, {
        autoFocus: false,
      });

      modalRef.afterClosed().subscribe(() => {
        this.form.patchValue({ frequency: 'once' });
      });
    }
  }
}
