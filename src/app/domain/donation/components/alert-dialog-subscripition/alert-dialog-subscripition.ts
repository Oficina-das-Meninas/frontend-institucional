import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog-subscripition',
  imports: [MatButtonModule, MatDialogContent, MatDialogClose],
  template: `
    <mat-dialog-content>
      <h2 class="text-lg font-semibold">Aviso</h2>

      <p class="dialog-message mt-4">
        Para fazer uma doação recorrente, é necessário estar logado em uma
        conta.
      </p>
      <div class="mt-4">
        <button mat-button mat-dialog-close>Fechar</button>
      </div>
    </mat-dialog-content>
  `,
  styleUrl: './alert-dialog-subscripition.scss',
})
export class AlertDialogSubscripition {}
