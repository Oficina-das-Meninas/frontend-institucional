// ```
// {
//     "donor": {
//         "name": "Caio S Lopes",
//         "email": "caiolopes.social@gmail.com",
//         "document": "12312312387",
//         "phone": {
//             "country": "+55",
//             "area": "16",
//             "number": "997058005"
//         }
//     },
//     "donation": {
//         "value": 1200,
//         "isRecurring": false
//     }
// }
// ```


type Donor = {
  name: string;
  email: string;
  document: string;
  phone: {
    country: string;
    area: string;
    number: string;
  };
};

type Donation = {
  value: number;
  isRecurring: boolean;
};

export type DonationRequest =  {
  donor: Donor;
  donation: Donation;
}
