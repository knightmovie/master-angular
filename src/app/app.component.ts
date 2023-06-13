import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IconService } from '@core/services/icon.service';
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

  constructor(private _iconService: IconService) {
    this._registryIcons();
  }


  private _registryIcons() {
    this._iconService.registry('../assets/iconset.svg');
  }
}
