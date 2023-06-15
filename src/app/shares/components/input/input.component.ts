import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, HostBinding, HostListener, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MVInputLabel, MVInputField } from './input.directive';

@Component({
  selector: 'mv-input-field',
  standalone: true,
  imports: [CommonModule, MVInputField],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.appearance]': `appearance`,
  }
})
export class MVInputFormField implements AfterContentInit, OnDestroy {


  @ContentChild(MVInputLabel, {static: true}) label: MVInputLabel;
  @ContentChild(MVInputField, {static: true}) input: MVInputField;
  @Input() appearance: 'underline' | 'round' = 'round';


  ngAfterContentInit(): void {
    this.addEvent()
  }

  // checkInput() {
  //   if (this.input?._elementRef) {
  //     console.log(this.input?._elementRef);
  //     // document.addEventListener(this.input.elementRef.nativeElement as HTMLInputElement, 'change')
  //     (this.input._elementRef.nativeElement as HTMLInputElement).addEventListener("change", (event: any) => this.checkValidAndEmpty(event));
  //   }
  // }

  @HostListener('focusout', ['$event.target'])
  onFocusout(target: any) {
    if (this.checkValidAndEmpty()) {
      this.attrInvalid = true;
      this.attrValid = false;
    } else {
      this.attrInvalid = false;
      this.attrValid = true;
    }

    console.log("focus my-app  sadsad");
  }

  // @HostListener('focus', ['$event.target'])
  // onFocus(target: any) {
  //   console.log("Focus here")
  //   this.attrInvalid = false;
  //   this.attrValid = false;
  //   this.attrFocus = true;
  // }

  // @HostListener('focus')
  // onFocus() {
  //   console.log('onFocus');
  // }

  @HostBinding('class.focus') attrFocus = false;
  @HostBinding('class.invalid') attrInvalid = false;
  @HostBinding('class.valid') attrValid = false;
  @HostBinding('attr.tabindex') public tabindex = 0;

  ngOnDestroy(): void {

  }


  checkValidAndEmpty() {
    const valid =  this.input._elementRef.nativeElement.validity.valid;
    const value = this.input._elementRef.nativeElement.value;
    const ret = (!value || value.length === 0 ) && !valid;
    console.log("Valid control", valid)
    return ret;
  }

  addEvent() {
    (this.input._elementRef.nativeElement as HTMLInputElement).addEventListener('input', (event: any) => this.checkInvalid(event))
  }

  checkInvalid(event: any) {
    // console.log(event);
    const valid =  this.input._elementRef.nativeElement.validity.valid;
    console.log(event);
    console.log(valid);

    console.log(this.input._elementRef.nativeElement.dir)
  }
}
