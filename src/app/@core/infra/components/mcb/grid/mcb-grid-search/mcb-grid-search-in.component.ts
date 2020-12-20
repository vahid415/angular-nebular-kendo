import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-grid-search-in',
  templateUrl: './mcb-grid-search-in.component.html',
  animations: [trigger('fadeInOut', [state('void', style({
    opacity: 0
  })), transition('void <=> *', animate(500))])],
})
export class McbGridSearchInComponent implements OnInit {

  @Output() submit: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
