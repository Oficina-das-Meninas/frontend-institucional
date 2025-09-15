import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-invoice-donation',
  imports: [MatButtonModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './invoice-donation.html',
  styleUrl: './invoice-donation.scss',
})
export class InvoiceDonation {
  isVideoLoading = true;

  onIframeLoad() {
    this.isVideoLoading = false;
  }
}