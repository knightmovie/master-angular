import { Directive } from "@angular/core";

@Directive({
  selector: '[fieldSuffix]',
  standalone: true
})
export class FormFieldSufixDirective {}

@Directive({
  selector: '[fieldLabel]',
  standalone: true
})
export class FormFieldLabelDirective {}


@Directive({
  selector: '[fieldPrefix]',
  standalone: true
})
export class FormFieldPrefixDirective {}
