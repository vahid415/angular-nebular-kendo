import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-column',
  template: '<ng-content></ng-content>',
  host: {
    '[class]': 'columnClass'
  }
})
export class ColumnComponent implements OnInit {
  @Input() col_md: string;
  @Input() col_sm: string;
  @Input() col_lg: string;
  @Input() col_xl: string;
  columnClass = '';

  constructor() {
  }

  ngOnInit() {
    this.columnClass = this.col_sm ? this.columnClass.concat('col-sm-').concat(this.col_sm).concat(' ')
    : this.columnClass;
    this.columnClass = this.col_md ? this.columnClass.concat('col-md-').concat(this.col_md).concat(' ')
    : this.columnClass;
    this.columnClass = this.col_lg ? this.columnClass.concat('col-lg-').concat(this.col_lg).concat(' ')
    : this.columnClass;
    this.columnClass = this.col_xl ? this.columnClass.concat('col-xl-').concat(this.col_xl).concat(' ')
    : this.columnClass;
  }
}
