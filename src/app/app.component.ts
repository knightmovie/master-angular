import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Loading } from './shares/components/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterLink, RouterOutlet, Loading],
})
export class AppComponent {
  title = 'admin-client';
}
