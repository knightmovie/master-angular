import { NotFoundComponent } from './pages/_components/not-found/not-found.component';
import { Routes } from '@angular/router';

export const AppRouting: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home-routing').then((m) => m.HomeRouting),
    // canActivate: [AuthenticationGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/authentication/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
