import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout').then(m => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () => import('./domain/home/containers/home/home').then(m => m.Home),
      },
      {
        path: 'doar-nota-fiscal',
        loadComponent: () =>
          import('./domain/home/containers/invoice-donation/invoice-donation').then(m => m.InvoiceDonation),
      },
      {
        path: 'sobre',
        loadComponent: () =>
          import('./domain/home/containers/about/about').then(m => m.About),

      },
      {
        path: 'seja-um-padrinho',
        loadComponent: () =>
          import('./domain/donation-plans/containers/donation-plans/donation-plans').then((m) => m.DonationPlans),
      },
      {
        path: 'eventos/:id',
        loadComponent: () =>
          import('./domain/events/containers/event-details/event-details').then((m) => m.EventDetails),
      }
    ],
  },
  { path: '**', redirectTo: '' },
];
