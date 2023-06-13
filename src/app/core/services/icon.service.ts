import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private _matIconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    ) { }

  registry(urlIcons: string) {
    this._matIconRegistry.addSvgIconSet(this._sanitizer.bypassSecurityTrustResourceUrl(urlIcons))
  }
}
