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
        path: 'eventos',
        loadComponent: () => import('./domain/events/containers/events/events').then(m => m.Events),
      },
      {
        path: 'doar-nota-fiscal',
        loadComponent: () =>
          import('./domain/invoice-donation/containers/invoice-donation/invoice-donation').then(m => m.InvoiceDonation),
      },
      {
        path: 'sobre',
        loadComponent: () =>
          import('./domain/about/containers/about/about').then(m => m.About),
      },
      {
        path: 'seja-um-padrinho',
        loadComponent: () =>
          import('./domain/donation-plans/containers/donation-plans/donation-plans').then((m) => m.DonationPlans),
      },
      {
        path: 'seja-um-voluntario',
        loadComponent: () =>
          import('./domain/volunteer/containers/volunteer/volunteer').then((m) => m.Volunteer),
      },
      {
        path: 'transparencia',
        loadComponent: () =>
          import('./domain/transparency/containers/transparency/transparency').then((m) => m.Transparency),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
