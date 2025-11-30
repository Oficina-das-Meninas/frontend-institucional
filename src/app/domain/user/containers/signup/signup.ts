import { Component, inject } from '@angular/core';
import { Logo } from '../../../../shared/components/logo/logo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormHelperService } from '../../../../shared/services/form/form-helper-service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { cpfValidator } from '../../../../shared/validators/document.validator';
import { AuthService } from '../../../../shared/services/auth/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [provideNgxMask()],
  imports: [
    CommonModule,
    Logo,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatSnackBarModule,
    NgxMaskDirective,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignUp {
  form!: FormGroup;
  formHelper = inject(FormHelperService);
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  loadingRequest = false;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl<string>(null!, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      document: new FormControl<string>(null!, [
        Validators.required,
        cpfValidator(),
      ]),
      email: new FormControl<string>(null!, [
        Validators.required,
        Validators.email,
        Validators.maxLength(255),
      ]),
      phone: new FormControl<string>(null!, [Validators.required]),
      password: new FormControl<string>(null!, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
      ]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingRequest = true;
    const rawValue = this.form.getRawValue();

    const payload = {
      name: rawValue.name,
      email: rawValue.email,
      document: rawValue.document.replace(/\D/g, ''),
      phone: rawValue.phone.replace(/\D/g, ''),
      password: rawValue.password,
    };

    this.authService.createUserAccount(payload).subscribe({
      next: () => {
        this.router.navigate(['/confirmacao-email']);
      },
      error: (err) => {
        this.loadingRequest = false;
        this.snackBar.open(
          'Não foi possível realizar o cadastro. Verifique os dados e tente novamente.',
          'Fechar',
          { duration: 5000 }
        );
      },
      complete: () => {
        this.loadingRequest = false;
      },
    });
  }
}
