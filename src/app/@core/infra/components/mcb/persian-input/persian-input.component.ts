import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { PersianInputDirective } from '../../../shared/forms/masks/persian-input.directive';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PersianInputComponent), multi: true
};

@Component({
  selector: 'app-persian-input',
  templateUrl: 'persian-input.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PersianInputComponent implements OnInit, ControlValueAccessor, Validator {

  @ViewChild('tooltip') tooltipDir: TooltipDirective;
  @ViewChild('persianDir') persianDir: PersianInputDirective;
  @Input() disabled = false;
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
    if (this.persianDir) {
      if (!this.persianDir.isPersian(this.value)) {
        this.value = '';
        this.persianDir.showTitleBar();
      } else {
        this.persianDir.hidingTitleBar();
      }
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
