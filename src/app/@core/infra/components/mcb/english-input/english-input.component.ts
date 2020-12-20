import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { EnglishInputDirective } from '../../../shared/forms/masks/english-input.directive';

@Component({
  selector: 'app-english-input',
  templateUrl: './english-input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EnglishInputComponent), multi: true }
  ]
})
export class EnglishInputComponent implements OnInit, ControlValueAccessor, Validator {

  @ViewChild('tooltip') tooltipDir: TooltipDirective;
  @ViewChild('englishDir') englishDir: EnglishInputDirective;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() maxLength: number;
  @Input() minLength: number;

  value: string;

  private onChangeCallback: any = () => {
  }
  private onTouchedCallback: any = () => {
  }
  private onValidatorChangeCallback: any = () => {
  }


  constructor(private el: ElementRef) {

  }

  handleHideTitleBar() {
    this.tooltipDir.hide();
  }

  showTooltip(eventTarget: any) {
    this.value = eventTarget.value;
    this.onChangeCallback(eventTarget.value);
    this.tooltipDir.show(eventTarget);
  }

  hideTooltip() {
    this.tooltipDir.hide();
    this.onTouchedCallback();
  }

  ngOnInit(): void {
    if (!this.englishDir.isEnglish(this.value)) {
      this.value = '';
      this.englishDir.showTitleBar();
    } else {
      this.englishDir.hidingTitleBar();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return undefined;
  }

  writeValue(obj: any): void {
    if (obj === null || obj === undefined) {
      this.value = '';
    } else {
      this.value = obj;
      this.onChangeCallback(obj);
    }
  }

}
