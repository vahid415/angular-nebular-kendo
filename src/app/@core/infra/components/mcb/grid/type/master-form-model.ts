import { MasterGridColumnType } from './enum/mcb-grid-column-type';

export class MasterFormModel {
  title = '';
  icon = '';
  entityTitle = '';
  addBtnTitle = '';
  openInPopUp = false;
  masterGridColumnsModel: MasterFormColumn[] = [];
  masterGridDetailColumnsModel: MasterFormColumn[] = [];
  masterGridToolbarBtn: MasterFormToolbarBtn[] = [];

  constructor() {
  }

  addMasterGridColumn(column: any) {
    this.masterGridColumnsModel.push(column);
  }

  addMasterGridDetailColumn(column: any) {
    this.masterGridDetailColumnsModel.push(column);
  }
  addMasterGridToolbarBtn(btn: any) {
    this.masterGridToolbarBtn.push(btn);
  }
}

export class MasterFormColumn {
  field: string;
  title?: string;
  format?: any;
  cellTemplate?: (cellElement: HTMLElement, cellInfo: any) => string;
  sortable?: boolean;
  align?: 'left | right | center';
  type?: MasterGridColumnType;
  locked?: boolean;
  width?: number;

}
export class MasterFormToolbarBtn {
  type?: string;
  title: string;
  permission?: string;
  icon?: string;
  disabled?: boolean | ((event: Event) => any);
  primary?: boolean;
  class?: string;
  iconClass?: string;
  click?: (event: Event) => any;
}
