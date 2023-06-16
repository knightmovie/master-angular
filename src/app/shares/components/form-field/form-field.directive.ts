import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: '[fieldSuffix]',
  standalone: true
})
export class FormFieldSufixDirective {}

@Directive({
  selector: '[fieldLabel]',
  standalone: true
})
export class FormFieldLabelDirective {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}


@Directive({
  selector: '[fieldPrefix]',
  standalone: true
})
export class FormFieldPrefixDirective {}
