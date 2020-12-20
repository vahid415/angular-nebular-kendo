import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';


@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[required]',
    exportAs: 'mcbRequired',
})
export class RequiredFieldDirective {
    @Input('required') value: any;

    constructor() {
    }
}
