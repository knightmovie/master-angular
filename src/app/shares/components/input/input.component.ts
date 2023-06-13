import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MVInputLabel } from './input.directive';

@Component({
  selector: 'mv-input-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MVInputFormField {
  @ContentChild(MVInputLabel, {static: true}) label: MVInputLabel
  @Input() appearance: 'underline' | 'round' = 'underline';

}
