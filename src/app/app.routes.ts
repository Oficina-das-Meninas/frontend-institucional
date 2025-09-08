import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./domain/home/containers/home/home').then((m) => m.Home),
  },
  { path: '**', redirectTo: '/' },
];
