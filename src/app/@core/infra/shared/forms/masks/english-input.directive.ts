import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2} from '@angular/core';


@Directive({
  selector: '[mcbEnglishInput]', exportAs: 'mcbEnglishInput',
})
export class EnglishInputDirective implements OnInit {

  private regex: RegExp = new RegExp('^[a-zA-Z0-9$@$!%*?&#^-_. +]+$');

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete'];

  @Input() myInput: any;
  @Output() hideTitleBar: EventEmitter<boolean> = new EventEmitter();
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  constructor(private el: ElementRef, private _renderer: Renderer2) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !this.isEnglish(next)) {
      this.showTitleBar();
      event.preventDefault();
    } else {
      this.hidingTitleBar();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const current: string = event.clipboardData.getData('text/plain');
    if (!this.isEnglish(current)) {
      this.showTitleBar();
      event.preventDefault();
    } else {
      this.valueChange.emit(current);
      this.hidingTitleBar();
      return;
    }
  }

  isEnglish(value: any) {
    if (value === undefined) {
      return true;
    } else {
      return String(value).match(this.regex);
    }
  }

  showTitleBar() {
    this._renderer.setAttribute(this.el.nativeElement, 'title', 'تنها حروف انگلیسی مجاز است');
    this._renderer.addClass(this.el.nativeElement, 'invalidPersianInput');
  }

  hidingTitleBar() {
    this.hideTitleBar.emit(true);
    this._renderer.removeAttribute(this.el.nativeElement, 'title');
    this._renderer.removeAttribute(this.el.nativeElement, 'data-title');
    this._renderer.removeClass(this.el.nativeElement, 'invalidPersianInput');
  }

  ngOnInit() {
    this._renderer.setStyle(this.el.nativeElement, 'text-align', 'left');
  }
}
