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
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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

@Component({
  selector: 'app-make-your-donation',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
    NgxMaskPipe, // Importante para usar o pipe no HTML (ex: user.phone | mask:...)
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
      amount: new FormControl<number | null>(null, [Validators.min(1)]),
      frequency: new FormControl<string>('once', [Validators.required]),
      recaptcha: new FormControl<string>(null!, [Validators.required]),
    });
  }

  ngOnInit() {
    this.checkUserSession();

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
    let currentAmount = Number(this.form.get('amount')?.value) || 0;
    const newAmount = currentAmount + value;

    this.form.patchValue({ amount: newAmount });
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
    const amountToSend = rawValue.amount ?? this.selectedAmount;

    if (!amountToSend || amountToSend <= 0) {
      this.form.get('amount')?.setErrors({ required: true });
      return;
    }

    const rawPhone = rawValue.phone ? rawValue.phone.replace(/\D/g, '') : '';
    const formattedPhone = '+55' + rawPhone;

    // Correção do erro de TypeScript: Garante string, mesmo se undefined
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
        window.open(response.data.checkoutLink, '_blank');
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
