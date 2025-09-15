import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'transparencia',
    loadComponent: () =>
      import('./domain/transparency/containers/transparency/transparency').then((m) => m.Transparency),
  },
  { path: '**', redirectTo: '/' },
];