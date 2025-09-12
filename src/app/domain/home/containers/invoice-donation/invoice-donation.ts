import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invoice-donation',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './invoice-donation.html',
  styleUrl: './invoice-donation.scss',
})
export class InvoiceDonation implements OnInit {
  isVideoLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isVideoLoading = false;
    }, 3000);
  }

  onIframeLoad() {
    this.isVideoLoading = false;
  }
}
