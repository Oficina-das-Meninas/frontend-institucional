import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DonationRequest } from '../model/donation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private readonly apiUrl = `${environment.apiUrl}/donations`;
  private http = inject(HttpClient);

  public sendDonation(donationData: DonationRequest) {
    return this.http.post<{ data: { checkoutLink: string } }>(
      `${this.apiUrl}`,
      donationData
    );
  }
}
