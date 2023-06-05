import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const HomeRouting: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
];
