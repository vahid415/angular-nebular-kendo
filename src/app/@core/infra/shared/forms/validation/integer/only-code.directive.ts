import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[mcbOnlyCode]'
})
export class OnlyCodeDirective {

  constructor(private ngControl: NgControl, private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (value.endsWith('+')) {
      this.ngControl.control.patchValue(value.replace(/\+/, '000'));
      return;
    }

    if (value.endsWith('000-')) {
      value = value.substr(0, (value.length) - 4);
      this.ngControl.control.patchValue(value);
      return;
    }
    if (value.match(/[^0-9]/g)) {
      this.ngControl.control.patchValue(value.replace(/[^0-9]/g, ''));
      return;
    }
    this.renderer.setAttribute(this.el.nativeElement, 'title', 'فقط اعداد مجاز میباشند');
  }
}
