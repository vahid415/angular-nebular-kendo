import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[mcbOnlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private ngControl: NgControl, private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (value.startsWith('0') || value.match(/[^0-9]/g)) {
      const val = value.startsWith('0') ? value.substring(1) : value.trim();
      this.ngControl.control.patchValue(val.replace(/[^0-9]/g, ''));
      return;
    }
  }
}
