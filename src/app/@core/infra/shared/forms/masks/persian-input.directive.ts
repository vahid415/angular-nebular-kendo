import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mcbPersianInput]', exportAs: 'mcbPersianInput',
})
export class PersianInputDirective implements OnInit {

  // ^[\u0600-\u06FF0$@$!%*?&#^-_. +]+$
  //   private regex: RegExp = new RegExp('^([\u0600-\u06FF0-9]+\\s?)+$');
  private regex: RegExp = new RegExp('^[\u0600-\u06FF0-9$@$!%*?&#^-_. +]+$');

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete'];

  @Input() myInput: any;
  @Output() hideTitleBar: EventEmitter<boolean> = new EventEmitter();
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'text-align', 'right');
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !this.isPersian(next)) {
      this.showTitleBar();
      event.preventDefault();
    } else {
      this.hidingTitleBar();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const current: string = event.clipboardData.getData('text/plain');
    if (!this.isPersian(current)) {
      this.showTitleBar();
      event.preventDefault();
    } else {
      this.valueChange.emit(current);
      this.hidingTitleBar();
      return;
    }
  }

  isPersian(value: any) {
    if (value === undefined) {
      return true;
    } else {
      return String(value).match(this.regex);
    }
  }

  showTitleBar() {
    this.renderer.setAttribute(this.el.nativeElement, 'title', 'تنها حروف فارسی مجاز است');
    this.renderer.addClass(this.el.nativeElement, 'invalidPersianInput');
  }

  hidingTitleBar() {
    this.hideTitleBar.emit(true);
    this.renderer.removeAttribute(this.el.nativeElement, 'title');
    this.renderer.removeAttribute(this.el.nativeElement, 'data-title');
    this.renderer.removeClass(this.el.nativeElement, 'invalidPersianInput');
  }
}
