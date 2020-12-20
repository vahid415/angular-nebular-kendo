import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mcb-grid-search',
  template: '<ng-content></ng-content>'
})
export class McbGridSearchComponent implements OnInit {

  @Output() submit: EventEmitter<any>= new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

}
