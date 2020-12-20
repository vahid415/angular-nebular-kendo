import { NgForm } from '@angular/forms';
import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

import { FormState } from './state/form-state';

@Directive({
  selector: 'form[mcbForm]',
  exportAs: 'mcbForm',
})
export class FormDirective {
  @Input() safeNavigation = true;
  @Output() do = new EventEmitter<NgForm>();

  constructor(private form: NgForm, private formState: FormState) {
  }

  @HostListener('submit', ['$event']) onSubmit(e) {
    if (this.form.valid) {
      this.formState.saved = true;
      this.do.emit(this.form);
    }
  }

  // @HostListener('input', ['$event']) onInput(e) {
  //   if (this.safeNavigation) {
  //     if (this.form.invalid) {
  //       this.formState.saved = false;
  //     } else {
  //       this.formState.saved = true;
  //     }
  //   }
  // }

  @HostListener('change', ['$event']) valueChange(e) {
    this.formState.saved = true;
    if (this.safeNavigation) {
      for (const key in this.form.value) {
        if (Object.prototype.hasOwnProperty.call(this.form.value, key)) {
          if (this.form.value[key]) {
            this.formState.saved = false;
          }
        }
      }
    }
  }
  @HostListener('click', ['$event']) onClick(e) {
    this.formState.saved = true;
    if (this.safeNavigation) {
      for (const key in this.form.value) {
        if (Object.prototype.hasOwnProperty.call(this.form.value, key)) {
          if (this.form.value[key]) {
            this.formState.saved = false;
          }
        }
      }
    }
  }
}
