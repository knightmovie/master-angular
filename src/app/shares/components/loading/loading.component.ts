import { ChangeDetectionStrategy, Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { LoadingService } from './loading.service';
import { TemplatePortal } from '@angular/cdk/portal';


@Component({
  selector: 'mv-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Loading {
  @ViewChild('loading') loadingRef: TemplateRef<any>;
  private _overlayRef: OverlayRef = null;

  constructor(private _overlay: Overlay,
    private _loadingService: LoadingService,
    private _viewContainerRef: ViewContainerRef) {

      this._loadingService.loading$.subscribe(loading => {
        if (loading) {
          this._createOverlay();
        } else {
          this._destroyOverlay();
        }
      })
  }


  private _createOverlay() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }

    this._overlayRef = this._overlay.create(this._getOverlayConfig());
    this._overlayRef.attach(new TemplatePortal(this.loadingRef, this._viewContainerRef));
  }

  private _destroyOverlay() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }


  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'loading-overlay',
      width: '100%',
      height: '100%',
    })
  }
}
