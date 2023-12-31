import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: '[inputFieldPrefix]',
  standalone: true
})
export class MVInputFieldPrefix {}


@Directive({
  selector: '[inputField]',
  standalone: true
})
export class MVInputField {
  constructor(public _elementRef: ElementRef<HTMLInputElement>) {

  }
}


@Directive({
  selector: '[inputFieldSuffix]',
  standalone: true
})
export class MVInputFieldSuffix {}

@Directive({
  selector: '[inputFieldLabel]',
  standalone: true
})
export class MVInputLabel {}
