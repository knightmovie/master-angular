import { Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { NotFoundComponent } from './modules/_components/not-found/not-found.component';

export const AppRouting: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home-routing').then((m) => m.HomeRouting),
    // canActivate: [AuthenticationGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/authentication/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
