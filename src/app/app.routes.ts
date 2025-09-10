import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./domain/home/containers/home/home').then((m) => m.Home),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
