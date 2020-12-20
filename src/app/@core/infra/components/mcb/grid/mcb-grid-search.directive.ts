import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mcbGridSearch]', exportAs: 'mcbGridSearch'
})
export class MCBGridSearchDirective {

  constructor(public template: TemplateRef<any>) {
  }
}
