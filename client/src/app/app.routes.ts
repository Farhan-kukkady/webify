import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/signature/signature-page.component').then(
        (m) => m.SignaturePageComponent,
      ),
  },
  {
    path: 'signature',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'work',
    loadComponent: () =>
      import('./pages/work/work-page.component').then(
        (m) => m.WorkPageComponent,
      ),
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./pages/pricing/pricing-page.component').then(
        (m) => m.PricingPageComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then(
        (m) => m.ContactPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
