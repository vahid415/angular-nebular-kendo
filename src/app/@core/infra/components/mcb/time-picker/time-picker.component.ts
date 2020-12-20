import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerComponent), multi: true }]
})
export class TimePickerComponent implements OnInit, ControlValueAccessor, Validator {

  _value: any;
  @Input() disabled = false;
  @Input() name;
  @Input() readOnly;
  @Input() format = 'HH:mm:ss';
  private onTouchedCallback: any = () => {
  }
  private onChangeCallback: any = () => {
  }
  private onValidatorChangeCallback: any = () => {
  }

  constructor(private intlService: IntlService) {
  }

  ngOnInit() {
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
    if (obj != null || obj !== undefined) {
      this._value = new Date('2000/02/02 ' + obj);
    } else {
      this._value = null;
    }
  }

  handleValueChange(event) {
    this._value = event;
    this.onChangeCallback(this.intlService.formatDate(event, this.format));
  }

}
