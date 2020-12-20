import { McbDateDescriptor } from './../../../shared/localization/types';
import { NgbDatepickerI18nPersian } from './../../../shared/localization/date/ngb-date-picker-i18n-persian';
import { McbDate } from './../../../shared/localization/date/date';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap';
import {
  Component, Input, forwardRef, ViewChild, EventEmitter, Output, ElementRef, HostListener, ViewEncapsulation, Injectable
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';



// @Injectable()
// export class NgbDateParserFormatterPersian extends NgbDateParserFormatter {
//     parse(value: string): NgbDateStruct {
//         try {
//             const m = jMoment(value, 'jYYYY/jM/jD', true);
//             return m.isValid() ? { year: m.jYear(), month: m.jMonth() + 1, day: m.jDate() } : null;
//         } catch {
//             return null;
//         }
//     }

//     format(date: NgbDateStruct): string {
//         return date ? `${date.year}/${date.month}/${date.day}` : null;
//     }
// }

@Component({
  selector: 'app-date-picker',
  exportAs: 'mcbDatePicker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => McbDatePickerComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => McbDatePickerComponent), multi: true, },
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
    // { provide: NgbDateParserFormatter, useClass: NgbDateParserFormatterPersian },
  ]
})
export class McbDatePickerComponent implements ControlValueAccessor, Validator {
  @Input() mode: string; // for backward compatibility, will be removed in the future.
  @Input() disabled: boolean;
  @Input() open = false;
  @Input() min: McbDate;
  @Input() max: McbDate;
  @Input() set value(v: McbDate) {
    if (v instanceof McbDate || v === null || v === undefined) {
      this._date = v;
    } else {
      throw new Error('invalid date value. valid date values: McbDate|null|undefined.');
    }

    this._isValueSet = true;
    this._updateText();
    this.fireChangeEvents();
  }

  get value() {
    return this._date;
  }

  @Output() valueChange = new EventEmitter<McbDate>();

  // private members
  _datePickerValue: any;
  _text: string;
  @ViewChild('inputRef', { read: ElementRef }) private _inputRef: ElementRef;
  private _date: McbDate;
  private _isValueSet: boolean;
  private _onChangeCallback: any = () => { };
  private _onTouchedCallback: any = () => { };

  constructor(private el: ElementRef, private ngbCalendar: NgbCalendar) {
  }

  toggle() {
    this.open = !this.open;
    if (this.open) {
      this._inputRef.nativeElement.focus();
    }
  }

  _onToggleBtnClick(event: MouseEvent) {
    event.cancelBubble = true;
    this.open = !this.open;
    if (this.open) {
      this._inputRef.nativeElement.focus();
    }
  }

  _onInput(e) {
    if (!this._text) {
      this._date = null;
    } else {
      try {
        const sp = this._text.split('/');
        const format = `${'Y'.repeat(sp[0].length)}/${'M'.repeat(sp[1].length)}/${'D'.repeat(sp[2].length)}`;
        this._date = McbDate.parseJalaali(this._text, format);
        this._datePickerValue = this._date.toJalaali();
      } catch {
        this._date = McbDate.invalid();
      }
    }

    this.fireChangeEvents();
  }

  _onDateSelect(date: NgbDateStruct) {
    this.open = false;
    this._date = McbDate.fromJalaali(date as McbDateDescriptor);
    this._datePickerValue = date;
    this._updateText();
    this.fireChangeEvents();
  }

  _onBlur(e) {
    this._onTouchedCallback();
  }

  _onTodayClick() {
    this._onDateSelect(this.ngbCalendar.getToday());
  }

  _onInputFocus() {
    this.open = true;
  }

  _updateText() {
    this._text = this._date instanceof McbDate ? this._date.formatJalaali('YYYY/MM/DD') : '';
  }

  _min() {
    return this.min ? this.min.toJalaali() : null;
  }

  _max() {
    return this.max ? this.max.toJalaali() : null;
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: MouseEvent): void {
    if (this.open) {
      let element;
      element = event.target;
      while (element) {
        if (element === this.el.nativeElement) {
          return;
        }
        element = element.parentNode;
      }
      this.open = false;
    }
  }

  // ControlValueAccessor Implementation
  writeValue(value: any): void {
    if (this._isValueSet) {
      /* User has set "value" property. this method is called becuse the user also has put a
         ngModel directive on the input (this is mandatory).
         we should not go further beacuse this component ONLY works with one of these values:
         "string dates (ngModel) or McbDate (comes from "value" property)

         We should ignore the value that is being written. so, we call fireChangeEvents() to
         rewrite it's NgModel value (by calling  this._onChangeCallback())
      */
      this.fireChangeEvents();
      return;
    }

    if (value === null || value === undefined || value === '') {
      this._date = null;
    } else if (typeof value === 'string') {
      this._date = McbDate.parseGregorian(value, 'YYYY-MM-DD');
      this._datePickerValue = this._date.toJalaali();
    } else {
      throw new Error('invalid date value');
    }

    this._updateText();
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  // End of ControlValueAccessor Implementation

  // Validator Implementation
  validate(c: AbstractControl): ValidationErrors {
    const err: any = { mcbDatePicker: {} };

    if (!this._date) {
      return null;
    }

    if (!this._date.isValid()) {
      err.mcbDatePicker.invalid = {
        value: this._text
      };
      return err;
    }

    if (this.min && this._date.isBefore(this.min)) {
      err.mcbDatePicker.min = {
        min: this.min,
        date: this._date
      };
      return err;
    }

    if (this.max && this._date.isAfter(this.max)) {
      err.mcbDatePicker.max = {
        max: this.max,
        date: this._date
      };
      return err;
    }

    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
  }
  // End Validator Implementation

  private fireChangeEvents() {
    if (!this._date) {
      this._onChangeCallback(null);
      this.valueChange.emit(null);
    } else if (this._date.isValid()) {
      this._onChangeCallback(this._date.formatGregorian('YYYY-MM-DD'));
      this.valueChange.emit(this._date);
    } else {
      // enforce calling validate method
      this._onChangeCallback('invalid_date');
    }
  }
}

