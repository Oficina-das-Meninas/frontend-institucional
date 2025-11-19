// export type DonationDescriptionCardType = {
//   donationMethod: string;
//   value: number;
//   pointsEarned: number;
//   bonus: Array<{ description: string; points: number }>;
//   sequence: number;
// };

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PIX = 'PIX',
  DEBIT_CARD = 'DEBIT_CARD',
  BOLETO = 'BOLETO',
}

export type DonationDescriptionCardType = {
  donatedValue: number;
  donatedDate: Date;
  earnedPoints: number;
  totalPoints: number;
  paymentMethod: PaymentMethod;
  bonuses: {
    donatedBonus: number;
    firstDonationBonus: number;
    recurrenceBonus: number;
  };
  recurrenceSequence: number;
};
