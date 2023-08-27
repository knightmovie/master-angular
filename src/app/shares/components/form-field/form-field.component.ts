import { FormFieldLabelDirective } from './form-field.directive';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, HostBinding, Input, Output, Self, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { debounceTime, tap, Subject, takeUntil } from 'rxjs';

// enum InputState {
//   INIT_VALUE = ''
// }

type InputState = 'focus-state' | 'invalid-state' | 'valid-state' | 'none';

@Component({
  selector: 'mv-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.appearance]': `appearance`,
    'tabindex': "-1"
  }
})
export class FormField implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @ContentChild(FormFieldLabelDirective, {static: true}) label: FormFieldLabelDirective;
  private _onChange: (value: string) => void;
  private _onTouched: () => void;
  private _disabled = false;
  private _subject = new Subject<void>();

  @Input()
  get disabled(): boolean { return this._disabled }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  @Input() type: string;
  @Input() appearance: 'underline' | 'round' = 'round';
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();
  @Output() onChanged = new EventEmitter<any>();
  public control: FormControl = new FormControl();


  @HostBinding('attr.input-state') attrFocusState: InputState = 'none';


  constructor(
    @Self() public _ngControl: NgControl,
    private _cdr: ChangeDetectorRef) {
    this._ngControl.valueAccessor = this;
  }


  ngAfterViewInit(): void {
    this.control.setValidators(this._ngControl.control.validator);
    this.control.updateValueAndValidity();
    this._checkRequiredLabel();
    this.subcribeValueChanges();
    setTimeout(() => {
      this._setDefaultInputState()
      this._cdr.detectChanges();
    }, 0)
  }

  ngOnDestroy(): void {
    this._subject.next();
    this._subject.complete();
  }

  writeValue(obj: any): void {
    if (this.control && obj) {
      this.control.setValue(obj, {emitEvent: false});
      this._cdr.detectChanges()
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  markAsTouched(event: any) {
    this._setInputState('focus-state');
    this._onTouched();
  }

  markAsOutFocus(event: any) {
    if (this.control.invalid) {
      this._setInputState('invalid-state');
    } else if (this.control.value !== null && ((<string>this.control.value).length > 0)) {
      this._setInputState('valid-state');
    } else {
      this._setInputState('none')
    }
  }

  subcribeValueChanges() {
    this.control.valueChanges.pipe(
      takeUntil(this._subject),
      debounceTime(200),
      tap(_ => {
        if (this.control.status === 'INVALID') {
          this._setInputState('invalid-state');
        } else {
          this._setInputState('focus-state');
        }
      })
    ).subscribe(value => {
      this.onChanged.emit(value);
      this._onChange(value);
    });
  }

  private _setDefaultInputState() {
    if (this.control.value !== null && !this.control.dirty) {
      this._setInputState('valid-state')
    }
  }

  private _setInputState(state: InputState) {
    this.attrFocusState = state;
  }

  private _checkRequiredLabel() {
    if (this.control?.validator) {
      const validator = this.control?.validator({} as AbstractControl);
      if (validator && validator['required']  && this.label) {
        const text = (this.label.elementRef.nativeElement).innerHTML;
        (this.label.elementRef.nativeElement).innerHTML =  `${text}*`;
      }
    }
  }
}
