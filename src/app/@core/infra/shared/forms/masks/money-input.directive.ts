import {
  AfterViewChecked,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import { PersianNumber } from './persian-number';

@Directive({
  selector: '[mcbMoneyInput]'
})
export class MoneyInputDirective  {

  private regex: RegExp = new RegExp('^[0-9,.-]*$');

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

  @Input() myInput: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {

    const num2persian = new PersianNumber();
    const current: string = this.el.nativeElement.value;

    if (current !== '') {
      const str = num2persian.Num2persian(current);
      this.renderer.setAttribute(this.el.nativeElement, 'title', str + ' ریال');
      this.el.nativeElement.value = num2persian.formatSplitter(current);
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      if (this.el.nativeElement.value === '') {
        this.renderer.removeAttribute(this.el.nativeElement, 'title');
        this.renderer.removeAttribute(this.el.nativeElement, 'data-title');
        this.renderer.removeClass(this.el.nativeElement, 'invalidPersianInput');
      }
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      this.renderer.setAttribute(this.el.nativeElement, 'title', 'تنها عدد مجاز است');
      this.renderer.addClass(this.el.nativeElement, 'invalidPersianInput');
      event.preventDefault();
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'title');
      this.renderer.removeAttribute(this.el.nativeElement, 'data-title');
      this.renderer.removeClass(this.el.nativeElement, 'invalidPersianInput');
    }
  }
}
