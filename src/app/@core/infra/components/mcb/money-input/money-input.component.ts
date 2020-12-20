import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { PersianNumber } from '../../../shared/forms/masks/persian-number';

@Component({
  selector: 'app-money-input',
  templateUrl: 'money-input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MoneyInputComponent), multi: true }
  ]
})
export class MoneyInputComponent implements OnInit, ControlValueAccessor, Validator {

  tooltipText = '';
  spaceText = ' ';

  value: number;
  @Input() min: number;
  @Input() max: number;
  @Input() autoCorrect = false;
  @Input() format: any = 'n0';
  @Input() decimals: number;
  @Input() step = 1;
  @Input() tabIndex: number;
  @Input() spinners = true;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() placeholder: string;
  @Input() persianMoneyFormat = 'ریال';

  num2persian: PersianNumber;

  @ViewChild('anchor', { read: ElementRef }) tooltipRef: any;
  @ViewChild(TooltipDirective) tooltipDir: TooltipDirective;

  private onChangeCallback: any = () => {
  }
  private onTouchedCallback: any = () => {
  }
  private onValidatorChangeCallback: any = () => {
  }

  constructor() {
    this.num2persian = new PersianNumber();
  }

  ngOnInit() {
    if (this.value !== null && this.value !== undefined) {
      this.tooltipText = this.num2persian.Num2persian(this.value.toString()) + this.spaceText + this.persianMoneyFormat;
    }
  }

  showTooltipBar(number) {
    this.value = number;
    this.onChangeCallback(number);
    if (number) {
      const title: string = this.tooltipRef.nativeElement.querySelector('.k-input').title;
      this.tooltipText = this.num2persian.Num2persian(number) + this.spaceText + this.persianMoneyFormat;
      this.tooltipRef.nativeElement.querySelector('.k-input').title = this.tooltipText;
      this.tooltipDir.toggle(this.tooltipRef.nativeElement.querySelector('.k-input'));
      this.tooltipDir.show(this.tooltipRef.nativeElement.querySelector('.k-input'));
    }
  }

  hideTooltip() {
    if (this.value) {
      this.onChangeCallback(this.value);
    }
    this.checkMinMax();
    this.tooltipDir.hide();
  }

  showTooltip() {
    this.tooltipDir.show(this.tooltipRef.nativeElement.querySelector('.k-input'));
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
    if (obj) {
      this.value = obj;
      this.onChangeCallback(obj);
      this.checkMinMax();
    }
  }

  checkMinMax() {
    if (this.max) {
      if (this.value > this.max) {
        this.value = this.max;
        this.onChangeCallback(this.value);
      }
    }
    if (this.min) {
      if (this.value < this.min) {
        this.value = this.min;
        this.onChangeCallback(this.value);
      }
    }
  }


}
