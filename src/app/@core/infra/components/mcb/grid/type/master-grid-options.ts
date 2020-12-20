import { SelectableSettings, RowSelectedFn, RowClassFn, PagerSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';

export class MasterGridOption {
  pageSize = 10;
  sortable = true;
  resizable = true;
  readonly gridData: McbGridDataResult = new McbGridDataResult([], 0);
  start = 0;
  mySelection: Array<any> = [];
  selectable: SelectableSettings | boolean = { enabled: true, checkboxOnly: false, mode: 'single' };
  sortSetting: SortDescriptor[] = [];
  pagerSetting: PagerSettings = { buttonCount: 5, info: true, type: 'numeric', pageSizes: [5, 10, 20], previousNext: true };
  rowSelected: RowSelectedFn;
  rowClass: RowClassFn;
}

export class McbGridDataResult {
  data: Array<any>;
  total: number;
  constructor(data: [], total: number) {
    this.data = data;
    this.total = total;
  }
}




