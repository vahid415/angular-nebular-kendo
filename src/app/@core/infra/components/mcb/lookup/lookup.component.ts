import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChange,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { LookupService } from './lookup.service';
import { LookupStatusType } from './lookup-model';
import { Observable } from 'rxjs';
import { WindowService, WindowRef, WindowCloseResult } from '@progress/kendo-angular-dialog';

export type TextFieldFn = (dataItem: any) => string;
export type ServiceUrlFn = (data: any) => any;

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LookupComponent), multi: true
};
export const CUSTOM_INPUT_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS, useExisting: forwardRef(() => LookupComponent), multi: true
};


@Component({
  selector: 'app-lookup-first-version',
  templateUrl: './lookup.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALIDATORS]
})
export class LookupComponent implements OnInit, ControlValueAccessor, Validator, OnChanges {

  constructor(private windowService: WindowService, private lookupService: LookupService) {
  }

  value: any = '';
  currentObj;
  @Input() title = 'جستجو';
  @Input() width = 400;
  _width = 0;

  @Input() name: string;
  @Input() height = 400;
  @Input() positionCenter = true;
  @Input() top = 100;
  @Input() left = 100;
  @Input() showMin = true;
  @Input() showMax = true;
  @Input() showClose = true;
  @Input() modal = false;
  @Input() visibleShowDetails = false;
  @Input() showDetailsTitle = 'مشاهده جزپیات';
  @Output() showDetails: EventEmitter<any> = new EventEmitter();

  @Output() error: EventEmitter<any> = new EventEmitter();

  showModal = false;

  @Input() disabled = false;
  @Input() readonly = false;
  @Input() minlength: number | string = null;
  @Input() maxlength: number | string = null;
  @Input() max: string = null;
  @Input() min: string = null;
  @Input() pattern: string | RegExp = null;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() show: EventEmitter<any> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();

  showStatus = false;
  statusMessage = '';
  @Input() serviceUrl: ServiceUrlFn | string = () => '';
  // @Input() serviceUrl;
  @Input() serviceMethodType = 'GET';
  @Input() valueField: string;
  @Input() textField: TextFieldFn | string | string[] = () => '';
  @Input() required = false;
  lookupStyle: LookupStatusType = LookupStatusType.IGNORE;
  toolTipTitle = '';

  windowRef: WindowRef;
  showClearText = false;
  clearObject = {};
  _error = false;

  private onChangeCallback: any = () => {
  }
  private onTouchedCallback: any = () => {
  }
  private onValidatorChangeCallback: any = () => {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit() {
    this._width = this.width;
  }

  openWindow(template: TemplateRef<any>, titleBar: TemplateRef<any>) {

    if (this.positionCenter) {
      this.setPositionCenter();
    }


    this.show.emit();
    this.showModal = this.modal;
    this.windowRef = this.windowService.open({
      titleBarContent: titleBar,
      content: template,
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left
    });

    this.windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.showModal = false;
        this.close.emit();
      }
    });
  }

  clearText() {
    this.value = '';
    this.showClearText = false;
    this.toolTipTitle = null;
    this.changeStatus(undefined);
    this.clear.emit(null);
  }

  getEnterStatus(e, inputValue) {
    if (e.key === 'Enter') {
      const value = inputValue.value;
      this.showResult(value);
      e.preventDefault();
    }
  }

  getStatus(e, inputValue) {
    if (inputValue.value) {
      this.showClearText = true;
    } else {
      this.clearText();
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

  writeValue(obj: any): void {
    if (obj) {
      this.changeStatus(obj);
      this.showModal = false;
      if (this.windowRef != null || this.windowRef !== undefined) {
        this.windowRef.close();
      }
    }
  }

  showResult(value) {
    if (value) {
      if (typeof this.serviceUrl === 'function') {
        const fnResult = this.serviceUrl(value);
        if (fnResult instanceof Observable) {
          fnResult.subscribe(result => {
            this.changeStatus(result);
          }, error => {
            this.error.emit(error);
            this.changeStatus(null);
          });
        } else {
          this.changeStatus(this.serviceUrl(value));
        }
      } else if (this.serviceUrl) {
        this.lookupService.findDataById(this.serviceUrl.toString(), value).subscribe(result => {
          this.changeStatus(result);
        }, error => {
          this.error.emit(error);
          this.changeStatus(null);
        });
      }
    }
  }

  setTextField(obj) {
    let text = '';
    this.lookupStyle = LookupStatusType.SUCCESS;
    if (typeof this.textField === 'function') {
      text = this.textField(obj);
    } else if (this.textField instanceof Array) {
      this.textField.forEach(f => {
        text += obj[f];
        text += ' ';
      });
    } else if (this.textField !== '' && obj[this.textField] != null) {
      text = obj[this.textField];
    }
    if (text)
      this.showStatus = true;
    this.statusMessage = text;
  }

  changeStatus(obj) {
    this.currentObj = obj;
    if (obj == null || obj === undefined) {
      this.showStatus = false;
      this.showClearText = false;
      this._error = true;
      this.value = '';
      this.lookupStyle = LookupStatusType.IGNORE;
      this.onChangeCallback(this.clearObject);
    } else {
      if (obj instanceof Array) {
        // return list of Model Biding
        this.onChangeCallback(obj);
      } else {
        if (obj[this.valueField] != null) {
          this.showClearText = true;
          this.value = obj[this.valueField];
          this.lookupStyle = LookupStatusType.IGNORE;
          this.setTextField(obj);
          this._error = false;
          this.onChangeCallback(obj);
        } else {
          this.onChangeCallback(this.clearObject);
          this.lookupStyle = LookupStatusType.IGNORE;
          this.showStatus = false;
          this.showClearText = false;
          this._error = true;
          this.value = '';
        }
      }
    }
  }

  validate(c: AbstractControl): ValidationErrors {
    if (this.required) {
      if (this._error) {
        return {
          required: {
            value: this.value
          }
        };
      }
    }
    return null;
  }

  showDetailsClick() {
    this.showDetails.emit(this.currentObj);
  }

  setPositionCenter() {
    const layoutWidth = window.innerWidth;
    const layoutHeight = window.innerHeight;
    const windowWidth = this.width;
    const windowHeight = this.height;
    if (layoutWidth < windowWidth) {
      this.width = layoutWidth - 50;
      this.top = (layoutHeight - windowHeight) / 4;
      this.left = (layoutWidth - this.width) / 2;
    } else {
      this.width = this._width;
      this.top = (layoutHeight - windowHeight) / 4;
      this.left = (layoutWidth - windowWidth) / 2;
    }
  }
}
