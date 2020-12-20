import { Component, Input } from '@angular/core';
import { FilterService, BaseFilterCellComponent, ColumnComponent } from '@progress/kendo-angular-grid';

import { McbDatePickerDateChangeEvent } from '../../date-picker/types';

@Component({
  selector: 'app-grid-jalali-date-filter-cell',
  exportAs: 'mcbGridJalaliDateFilterCell',
  templateUrl: './jalali-date-filter-cell.component.html',
  styles: [':host: { width: 100%; display: inline-block }']
})
export class McbGridJalaliDateFilterCellComponent extends BaseFilterCellComponent {
  @Input() public column: ColumnComponent;

  constructor(public filterService: FilterService) {
    super(filterService);
  }

  _onDateChange(e: McbDatePickerDateChangeEvent) {
    this.applyFilter(
      !e.date ?
        this.removeFilter(this.column.field) :
        this.updateFilter({
          field: this.column.field,
          operator: 'eq',
          value: e.date.formatGregorian('YYYY-MM-DD')
        })
    );
  }
}
