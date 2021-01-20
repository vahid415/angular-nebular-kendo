import { NgForm } from '@angular/forms';
import { ViewChild, Component } from '@angular/core';

import { Filter } from '../../../../shared/types/filter.dto';
import { MasterFormComponent } from './master-form.component';
import { MasterFormModel, MasterFormToolbarBtn, MasterFormColumn, GenericCrudService, MasterGridOption } from '../type';

@Component({
  template: ''
})

export abstract class BaseMasterPageController {
  searchFilter: Filter[];
  gridOption: MasterGridOption = new MasterGridOption();
  @ViewChild('entityMasterEditForm') entityMasterEditForm;
  masterFormModel: MasterFormModel = new MasterFormModel();
  masterFormComponent: MasterFormComponent;
  masterFormService: GenericCrudService;
  selectedMasterEntity: any = {};
  selectedGridRows: any = [];
  viewMode = false;
  editForm: NgForm;
  searchForm: NgForm;
  // form: FormGroup = new FormGroup({});

  constructor(masterFormService: GenericCrudService) {
    this.masterFormService = masterFormService;
    this.initMasterFormLabels();
    this.initDataGridColumns();
    this.initDataGridToolbarBtn();
    this.initDataGridDetailColumns();
    this.searchForm = new NgForm([], []);
  }
  abstract initMasterFormLabels();
  abstract initDataGridColumns();

  initDataGridToolbarBtn() { }
  initDataGridDetailColumns() { }

  addMasterGridColumn(column: MasterFormColumn) {
    this.masterFormModel.addMasterGridColumn(column);
  }

  addMasterGridDetailColumn(column: MasterFormColumn) {
    this.masterFormModel.addMasterGridDetailColumn(column);
  }

  addMasterGridToolbarBtn(btn: MasterFormToolbarBtn) {
    this.masterFormModel.addMasterGridToolbarBtn(btn);
  }

  setMasterFormLabels(masterFormGridTitle, entityTitle, addBtnGridTitle?) {
    this.masterFormModel.title = masterFormGridTitle;
    this.masterFormModel.entityTitle = entityTitle;
    this.masterFormModel.addBtnTitle = addBtnGridTitle;
  }


  /*
   * when click on search Button in main panel this method called
   */
  beforeStartSearching() {
  }

  startSearch() {
    if (this.masterFormComponent) {
      this.masterFormComponent.startSearch();
    }
  }

  getSelectedRowsData(data) {
    if (this.masterFormComponent) {
      this.masterFormComponent.handleSelectionChange(data);
    }
  }

  getHandleSortChange(data) {
    if (this.masterFormComponent) {
      this.masterFormComponent.handleSortChange(data);
    }
  }

  getHandlePageChange(data) {
    if (this.masterFormComponent) {
      this.masterFormComponent.handlePageChange(data);
    }
  }

  beforeChangeToggle(field, data: any) {
    if (this.masterFormComponent) {
      this.masterFormComponent.changeToggle(field, data);
    }
  }

  beforeDeleteSelectedEntity(data: any) {
    if (this.masterFormComponent) {
      this.masterFormComponent.deleteSelectedEntity(data);
    }
  }

  beforeEditDialogOpen(example): boolean {
    this.initMasterEditForm(example);
    return true;
  }

  beforeSaveEntity(example: any): boolean {
    return true;
  }

  selectEntityInPopupMode(entity: any) {
    this.masterFormComponent.selectEntityInPopupMode(entity);
  }

  beforeEditSelectedEntity(data: any) {
    if (this.masterFormComponent) {
      this.masterFormComponent.editSelectedEntity(data);
    }
  }

  saveSelected() {
  }

  saveMasterEntity() {
    if (this.masterFormComponent) {
      this.masterFormComponent.saveMasterEntity();
    }
  }

  onCloseAddEditPanel() {
    if (this.masterFormComponent) {
      this.masterFormComponent.backToMain();
    }
  }

  initMasterEditForm(example: any) {
  }
}
