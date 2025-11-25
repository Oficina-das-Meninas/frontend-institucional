import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-dialog-subscription',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  template: `
    <h2 mat-dialog-title>Aviso</h2>
    <mat-dialog-content>
      <p class="dialog-message">
        Para fazer uma doação recorrente (mensal), é necessário estar logado em
        uma conta.
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" (click)="goToLogin()">
        Fazer Login
      </button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./alert-dialog-subscription.scss'],
})
export class AlertDialogSubscription {
  readonly dialogRef = inject(MatDialogRef<AlertDialogSubscription>);
  private router = inject(Router);

  goToLogin() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }
}
