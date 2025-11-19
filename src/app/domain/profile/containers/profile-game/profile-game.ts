import { Component, inject, signal, Signal } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { DonationDescriptionCard } from '../../components/donation-description-card/donation-description-card';
import { DonationDescriptionCardType } from '../../model/donation-description';
import { UserDonations } from '../../services/user-donations';
@Component({
  selector: 'app-profile-game',
  imports: [MatSliderModule, MatExpansionModule, DonationDescriptionCard],
  templateUrl: './profile-game.html',
  styleUrl: './profile-game.scss',
})
export class ProfileGame {
  totalPoints: number = 0;
  donations = signal<DonationDescriptionCardType[]>([]);
  userDonationServices = inject(UserDonations);

  constructor() {}

  ngOnInit() {
    this.userDonationServices
      .getDonationPointsByUser('039cb804-e62b-4a04-9147-d7fb5e46ec95')
      .subscribe({
        next: (res) => {
          console.log(res.data.contents);
          this.donations.set([...res.data.contents]);
        },
      });

    this.totalPoints = 10;
  }
}
