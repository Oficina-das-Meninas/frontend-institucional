export type DonationDescriptionCardType = {
  donationMethod: string;
  value: number;
  pointsEarned: number;
  bonus: Array<{ description: string; points: number }>;
  sequence: number;
};
