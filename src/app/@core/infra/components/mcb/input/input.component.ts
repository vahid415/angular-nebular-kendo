import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {InputService} from "./input.service";
import {Observable} from "rxjs";
import {ServiceUrlFn} from "../lookup/lookup.component";

@Component({
  selector: 'app-lookup',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
  data: any = null;
  value: any = null;
  text: string = null;
  valid = true;
  pending = false;
  @Input() invalid = false;
  @Input() ngModel: any = null;
  @Input() ngModelChange = new EventEmitter();

  @Input() title = 'search';
  @Input() name = `input_${Math.random()}`;
  @Input() auto = true;
  @Input() valueField = 'code';
  @Input() textField: string | string[] = null;
  @Input() serviceUrl: ServiceUrlFn | string = null;

  @Output() input = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  @Output() keydown = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();

  @Input() regExp: string | RegExp = null;
  @Input() maxlength: number | string = null;
  @Input() minlength: number | string = null;
  @Input() max: number | string = null;
  @Input() min: number | string = null;
  @Input() placeholder = '';

  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;

  view = false;
  @Output() viewChange = new EventEmitter<boolean>();
  @Input() width = 800;
  @Input() height = 400;
  @Input() top: number;
  bottom: number;
  right: number;
  @Input() left: number;

  // TODO: please delete props below after removing their usages in all libs
// 2: delete unnecessary (ngModelChange), (error) or (clear) outputs
// 3: delete or refactor probable old version class usages
// 4: delete show, close, error, modal, positionCenter, showMin, showMax in this class after finishing previous steps
  @Output() show = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  @Input() positionCenter: any;
  @Input() modal: any;
  @Input() showMin: any;
  @Input() showMax: any;

  constructor(private inputService: InputService) {
  }

  ngOnInit(): void {
    this.setDimensions();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any, value: string = null): void {
    this.setData(obj, value);
  }

  // methods
  onChange = ($event: any): void => {
  }

  onTouched = ($event: any): void => {
    this.blur.emit($event);
  }

  onValidatorChange = (): void => {
  }

  validate(control: AbstractControl): any {
    const res = this.testValue(this.value);
    return (res === null ? this.testValue(this.data) : res);
  }

  inputChange($event) {
    let value = this.value;
    if (this.data && ($event.data !== this.data)) {
      value = value?.replace(this.data, '');
    }
    this.writeValue(null, value);
  }

  testValue(value: string) {
    if (this.required && !value) {
      this.valid = false;
      return {required: true};
    } else if (value) {
      if (this.regExp && !(new RegExp(this.regExp).test(value))) {
        this.valid = false;
        return {pattern: {requiredPattern: new RegExp(this.regExp), actualValue: value}};
      } else if (this.minlength && Number(this.minlength) > value?.length) {
        this.valid = false;
        return {minlength: {requiredLength: this.translate(String(this.minlength))}};
      } else if (this.maxlength && Number(this.maxlength) < value?.length) {
        this.valid = false;
        return {maxlength: {requiredLength: this.translate(String(this.maxlength))}};
      } else if (this.min && Number(this.min) > Number(value)) {
        this.valid = false;
        return {min: {requiredMin: this.translate(String(this.min))}};
      } else if (this.max && Number(this.max) < Number(value)) {
        this.valid = false;
        return {max: {requiredMax: this.translate(String(this.max))}};
      }
    } else if (this.invalid) {
      this.valid = false;
      return {invalid: true};
    }
    this.valid = true;
    return this.valid ? null : {invalid: true};
  }

  modalChange(view: boolean) {
    this.viewChange.emit(this.view = view);
    view ? this.show.emit(view) : this.close.emit(view);
  }

  setDimensions() {
    this.left = this.right = (window.innerWidth - 800) / 2;
    this.top = (window.innerHeight - 400) / 1.5;
  }

  request($event): void {
    // delete first block after finishing refactors
    if (typeof this.serviceUrl === 'function' && Number($event.target?.value) > 0) {
      const fnResult = this.serviceUrl($event.target?.value);
      if (fnResult instanceof Observable) {
        fnResult.subscribe(result => {
          this.writeValue(result);
        }, error => {
          this.reset(error);
        });
      }
    } else {
      if (!this.pending) {
        if (typeof this.serviceUrl === 'string' && this.serviceUrl && Number($event.target?.value) > 0 &&
        this.testValue($event.target?.value) === null) {
          let value: number | string = String($event.target?.value);
          if (typeof this.ngModel?.[this.valueField] === 'number' || !value.startsWith('0') ||
            value === '0' || this.serviceUrl.indexOf('find-by-id') >= 0) {
            value = Number(value);
          } else {
            value = value.trim();
          }
          this.pending = true;
          this.inputService.findByValue(this.serviceUrl, value).subscribe((res) => {
            this.writeValue(res);
            this.pending = false;
          }, (error) => {
            console.log('error => ', error);
            this.reset();
            this.error.emit(error);
            this.pending = false;
          });
        }
      }
    }
    $event.preventDefault();
  }

  reset($event: any = null) {
    this.writeValue(null);
  }

  setData(obj: any, value: string = null): void {
    this.modalChange(false);
    this.data = obj?.[this.valueField]?.toString() ? obj?.[this.valueField] : null;
    this.value = this.data ? this.data : (value ? value : null);
    this.data ? this.setText(obj, this.textField) : this.text = null;
    this.onChange(this.data ? obj : null);
    if (!this.data?.toString()) {
      this.clear.emit(null);
    }
  }

  setText(obj, textField: string | string[]) {
    let result = typeof textField === 'string' ? textField : '';
    if (textField && textField?.length) {
      if (Array.isArray(textField)) {
        for (let i = 0; i < textField.length; i++) {
          if (typeof textField[i] === 'string') {
            result = obj?.[textField[i]] || obj?.[textField[i]] === 0 ?
            result + (i > 1 ? ' ' : '') + obj?.[textField[i]] : result;
          }
        }
      } else if (textField.includes('${')) {
        let key: any = null;
        // tslint:disable-next-line:no-conditional-assignment
        while (key = new RegExp(/\${([^}]+)}/g).exec(result)) {
          if (key[1] || key[1] === 0) {
            result = result.replace(key[0], obj?.[key[1]] || obj?.[key[1]] === 0 ? obj?.[key[1]] : '');
          }
        }
      } else if (obj?.[textField] || obj?.[textField] === 0) {
        result = obj?.[textField];
      } else if (textField && typeof textField === 'string' && obj && typeof obj === 'object' && !(textField in obj)) {
        result = textField;
      }
    }
    this.text = result ? result : null;
  }

  translate(value: string): string {
    const chars = value.split('');
    for (const char of chars) {
      if (!isNaN(Number(char))) {
        value = value.replace(char, ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][char]);
      }
    }
    return value;
  }
}
