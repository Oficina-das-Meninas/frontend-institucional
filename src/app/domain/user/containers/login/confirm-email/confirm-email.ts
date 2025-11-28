import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user';
import { AuthService } from '../../../../../shared/services/auth/auth';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './confirm-email.html',
})
export class ConfirmEmail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  status = signal<'loading' | 'success' | 'error'>('loading');
  errorMessage = signal<string>('Não foi possível verificar seu e-mail.');

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.status.set('error');
      this.errorMessage.set('Token de verificação inválido ou ausente.');
      return;
    }

    this.verifyToken(token);
  }

  verifyToken(token: string) {
    this.authService.verifyUserEmail(token).subscribe({
      next: () => {
        this.status.set('success');

        this.snackBar.open(
          'E-mail verificado com sucesso! Faça login para continuar.',
          'OK',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success'],
          }
        );

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error('Erro na verificação de email', err);
        this.status.set('error');
        this.errorMessage.set(
          'O link de verificação é inválido ou já expirou. Tente solicitar um novo.'
        );
      },
    });
  }
}
