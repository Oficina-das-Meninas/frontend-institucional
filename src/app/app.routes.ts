import { Routes } from '@angular/router';
import { eventDetailsResolver } from './domain/events/guards/event-details-resolver';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        title: 'Oficina das Meninas',
        loadComponent: () =>
          import('./domain/home/containers/home/home').then((m) => m.Home),
      },
      {
        path: 'eventos',
        title: 'Eventos - Oficina das Meninas',
        loadComponent: () =>
          import('./domain/events/containers/events/events').then(
            (m) => m.Events
          ),
      },
      {
        path: 'doar-nota-fiscal',
        title: 'Doe sua nota fiscal - Oficina das Meninas',
        loadComponent: () =>
          import(
            './domain/invoice-donation/containers/invoice-donation/invoice-donation'
          ).then((m) => m.InvoiceDonation),
      },
      {
        path: 'sobre',
        title: 'Sobre nós - Oficina das Meninas',
        loadComponent: () =>
          import('./domain/about/containers/about/about').then((m) => m.About),
      },
      {
        path: 'seja-um-padrinho',
        title: 'Seja um padrinho - Oficina das Meninas',
        loadComponent: () =>
          import(
            './domain/donation-plans/containers/donation-plans/donation-plans'
          ).then((m) => m.DonationPlans),
      },
      {
        path: 'faca-sua-doacao',
        loadComponent: () =>
          import(
            './domain/donation/containers/make-your-donation/make-your-donation'
          ).then((m) => m.MakeYourDonation),
      },
      {
        path: 'agradecemos-a-doacao',
        loadComponent: () =>
          import(
            './domain/donation/containers/donation-thank-you/donation-thank-you'
          ).then((m) => m.DonationThankYou),
      },
      {
        path: 'eventos/:id',
        loadComponent: () =>
          import('./domain/events/containers/event-details/event-details').then(
            (m) => m.EventDetails
          ),
        resolve: {
          event: eventDetailsResolver,
        },
      },
      {
        path: 'seja-um-voluntario',
        title: 'Seja um voluntário - Oficina das Meninas',
        loadComponent: () =>
          import('./domain/volunteer/containers/volunteer/volunteer').then(
            (m) => m.Volunteer
          ),
      },
      {
        path: 'transparencia',
        title: 'Transparência - Oficina das Meninas',
        loadComponent: () =>
          import(
            './domain/transparency/containers/transparency/transparency'
          ).then((m) => m.Transparency),
      },
      {
        path: 'perfil',
        canActivate: [authGuard],
        title: 'Perfil e Histórico - Oficina das Meninas',
        loadComponent: () =>
          import('./domain/user/containers/profile-game/profile-game').then(
            (m) => m.ProfileGame
          ),
      },
    ],
  },
  {
    path: 'login',
    title: 'Login Usuário',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./domain/user/containers/login/login').then((m) => m.Login),
  },

  { path: '**', redirectTo: '' },
];
