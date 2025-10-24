type Donor = {
  name: string;
  email: string;
  document: string;
  phone: string;
  id: string;
};

type Donation = {
  value: number;
  isRecurring: boolean;
};

export type DonationRequest = {
  donor: Donor;
  donation: Donation;
  captchaToken: string;
};
