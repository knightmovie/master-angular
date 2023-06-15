import { FormFieldLabelDirective } from './form-field.directive';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, HostBinding, HostListener, Input, Optional, Output, Renderer2, Self, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, AbstractControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';

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
  }
})
export class FormField implements ControlValueAccessor, AfterViewInit {
  @ContentChild(FormFieldLabelDirective, {static: true}) label: FormFieldLabelDirective;
  private _onChange: (value: string) => void;
  private _onTouched: () => void;
  private _disabled = false;

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

  @HostBinding('class.float-label-valid') validClass = false;
  @HostBinding('class.float-label-invalid') invalidClass = false;
  @HostBinding('class.focus-input') focusClass = false;
  @HostBinding('attr.tabindex') public tabindex = -1;

  constructor(
    @Self() public _ngControl: NgControl,
    private _cdr: ChangeDetectorRef,
    private __render2: Renderer2) {
    this._ngControl.valueAccessor = this;
    console.log(this._ngControl)
  }


  ngAfterViewInit(): void {
    this.control.setValidators(this._ngControl.control.validator)
    this.control.updateValueAndValidity();
    this.subcribeChanges()
    this._cdr.detectChanges()
  }

  writeValue(obj: any): void {
    if (this.control && obj) {
      console.log("Write object", obj)
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


  onChange(value: any) {
    console.log('onChange', this.control.value)
    console.log('onChange', this.control)
    this.onChanged.emit(value);
    this._onChange(value);

    if (this.control.invalid) {
      this.invalidClass = true;
      this._cdr.detectChanges();
    } else {
      this.invalidClass = false;
    }
  }

  markAsTouched(event: any) {
    this.focusClass = true;
  }


  markAsOutFocus(event: any) {

    if (this.control.invalid) {
      this.invalidClass = true;
      this._cdr.detectChanges();
    } else {
      this.validClass = true;
      const value = this.control.value as string;
      if (value.length === 0) {
        this.validClass = false;
        this.focusClass = false;
        this.invalidClass = false;
      }
    }
  }

  subcribeChanges() {
    this.control.valueChanges.pipe(
      debounceTime(500),
      tap(_ => {
        this.invalidClass =  (this.control.status === 'INVALID')

      })
    ).subscribe(

    )
  }
}
