import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

type Color = 'primary' | 'success' | 'info' | 'warn';

@Component({
  selector: 'mv-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Button {

  private _color: Color = 'primary';
  @HostBinding('attr.color') attrColor = 'primary';
  @Input()
  get color(): Color { return this._color }
  set color(value: Color) {
    this._color = value;
    this.attrColor = value;
  }

  @HostBinding('attr.disabled') attrDisabled = false;
  private _disabled = false;

  @Input()
  get disabled() { return this._disabled }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
    this.attrDisabled = this.disabled;
  }


  constructor() {}

  
}
