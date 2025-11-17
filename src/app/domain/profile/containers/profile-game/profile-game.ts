import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { DonationDescriptionCard } from '../../components/donation-description-card/donation-description-card';
import { DonationDescriptionCardType } from '../../model/donation-description';
@Component({
  selector: 'app-profile-game',
  imports: [MatSliderModule, MatExpansionModule, DonationDescriptionCard],
  templateUrl: './profile-game.html',
  styleUrl: './profile-game.scss',
})
export class ProfileGame {
  totalPoints: number = 0;
  donations!: DonationDescriptionCardType[];

  constructor() {}

  ngOnInit() {
    this.donations = [
      {
        donationMethod: 'Credit Card',
        value: 100,
        pointsEarned: 50,
        bonus: [
          { description: 'First Donation Bonus', points: 10 },
          { description: 'Loyalty Bonus', points: 5 },
        ],
        sequence: 1,
      },
      {
        donationMethod: 'Bank Transfer',
        value: 200,
        pointsEarned: 100,
        bonus: [{ description: 'High Value Donation Bonus', points: 20 }],
        sequence: 2,
      },
    ];

    this.totalPoints = this.donations.reduce(
      (acc, donation) =>
        acc +
        donation.pointsEarned +
        donation.bonus.reduce((bAcc, b) => bAcc + b.points, 0),
      0
    );
  }
}
