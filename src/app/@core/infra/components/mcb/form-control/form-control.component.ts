import { Component, OnInit, Input, Optional, ContentChild, ElementRef, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { NgControl, NgForm, ValidationErrors } from '@angular/forms';
import { TranslatorService } from '../../../shared/localization/lang/translator.service';
import { RequiredFieldDirective } from './required.directive';
import { ErrorMessageType } from '../../../shared/types/error-message';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css'],
  // tslint:disable-next-line: use-host-property-decorator
  host: {
    '[class]': '"mcb-form-control"'
  }
})
export class FormControlComponent implements OnInit, AfterContentChecked {
  @Input() label: string;
  @Input() labelKey: string | { key: string, subsystem: string };
  @Input() hint: string;
  @Input() hintKey: string | { key: string, subsystem: string };
  @Input() errorMessage: ErrorMessageType = new ErrorMessageType();
  @Input() showMessages = true;
  @Input() showValidationErrors = true;
  @ContentChild(NgControl, { static: true }) private ngCtrl: NgControl;
  @ContentChild(NgControl, { static: true, read: ElementRef }) private ngCtrlElm: ElementRef;
  @ContentChild(RequiredFieldDirective, { static: true }) private requiredDirective: RequiredFieldDirective;
  private _firstErrorReported: boolean;

  constructor(
    private trans: TranslatorService,
    private cdr: ChangeDetectorRef,
    @Optional() private form: NgForm
  ) {
  }

  ngOnInit() {
  }

  get labelText() {
    let label;
    if (typeof this.label === 'string') {
      label = this.label;
    } else if (typeof this.labelKey === 'string') {
      label = this.trans.instant(this.labelKey);
    } else if (typeof this.labelKey === 'object') {
      const { key, subsystem } = this.labelKey;
      label = this.trans.instant(key, subsystem);
    }

    return label;
  }

  get hintText() {
    let hint;
    if (typeof this.hint === 'string') {
      hint = this.hint;
    } else if (typeof this.hintKey === 'string') {
      hint = this.trans.instant(this.hintKey);
    } else if (typeof this.hintKey === 'object') {
      const { key, subsystem } = this.hintKey;
      hint = this.trans.instant(key, subsystem);
    }

    return hint;
  }

  get errorText() {
    let error;
    if (this.ngCtrl && this.ngCtrl.errors && (this.ngCtrl.touched || (this.form && this.form.submitted))) {
      this._firstErrorReported = true;
      error = this.localizeError(this.ngCtrl.errors);
    }
    if (this.ngCtrl && this.ngCtrl.control.value) { this.ngCtrl.control.markAsTouched(); }

    return error;
  }

  get required() {
    // if (!this.ngCtrl) {
    //   return false;
    // }

    // return this.ngCtrlElm.nativeElement.required;
    return this.requiredDirective && this.requiredDirective.value !== false;
  }

  localizeError(err: ValidationErrors) {
    let text: string;
    if (err.required) {
      this.errorMessage.required ? text = this.errorMessage.required : text = this.trans.instant('required');
    } else if (err.min) {
      this.errorMessage.min ? text = this.errorMessage.min :
        text = this.trans.instant('validation-err-min').replace('{0}', err.min.requiredMin);
    } else if (err.max) {
      this.errorMessage.max ? text = this.errorMessage.max :
        text = this.trans.instant('validation-err-max').replace('{0}', err.max.requiredMax);
    } else if (err.minlength) {
      this.errorMessage.minlength ? text = this.errorMessage.minlength :
        text = this.trans.instant('validation-err-minlength').replace('{0}', err.minlength.requiredLength);
    } else if (err.maxlength) {
      this.errorMessage.maxlength ? text = this.errorMessage.maxlength :
        text = this.trans.instant('validation-err-maxlength').replace('{0}', err.maxlength.requiredLength);
    } else if (err.email) {
      this.errorMessage.email ? text = this.errorMessage.email : text = this.trans.instant('validation-err-email');
    } else if (err.nationalCodeValidator) {
      this.errorMessage.nationalCodeValidator ? text = this.errorMessage.nationalCodeValidator :
        text = this.trans.instant('validation-err-invalid-national-code');
    } else if (err.equalWith) {
      this.errorMessage.equalWith ? text = this.errorMessage.equalWith : text = err.equalWith.message;
    } else {
      this.errorMessage.customErrorMsg ? text = this.errorMessage.customErrorMsg :
        text = this.trans.instant('validation-err-unknown');
    }
    return text;
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}
