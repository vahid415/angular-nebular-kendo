import { Directive, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
    selector: '[mcbAutoFocus]', exportAs: 'mcbAutoFocus',
})
export class AutoFocusDirective implements AfterContentInit {
    constructor(private el: ElementRef) {
    }

    ngAfterContentInit() {
        this.el.nativeElement.focus();
    }
}
