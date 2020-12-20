import { Directive, Input, OnInit, ViewChild } from '@angular/core';

@Directive({
  selector: '[mcbLookup]', exportAs: 'mcbLookup',
})
export class LookupDirective implements OnInit {

  @Input() type: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
