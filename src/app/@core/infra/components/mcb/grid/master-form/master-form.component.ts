import { SortDescriptor } from '@progress/kendo-data-query';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { GridComponent, PageChangeEvent, SelectionEvent } from '@progress/kendo-angular-grid';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import { GridSort } from '../../../../shared/types/sort.dto';
import { BaseMasterPageController } from './base-master-page-controller';
import { UIService } from './../../../../../portal/ui/services/ui.service';
import { MainPanelComponent } from './../../main-panel/main-panel.component';
import { PagingRequest } from './../../../../shared/types/paging-request.dto';
import { PagingResponse } from './../../../../shared/types/paging-response.dto';
import { MasterGridOperationOption, MasterGridOption, MasterFormPermission } from '../type';
import { TranslatorService } from './../../../../shared/localization/lang/translator.service';

@Component({
  selector: 'app-master-form',
  templateUrl: './master-form.component.html',
  styles: [`.kendo-grid-toolbar{
display: flex !important;
}`]
})
export class MasterFormComponent implements OnInit {
  gridOption: MasterGridOption;
  pagingReq: PagingRequest = new PagingRequest();

  /**
   * pass dynamic component for use master form
   */
  @Input() controller: BaseMasterPageController;

  /**
   * pass dynamic operation for set in cell grid operation
   */
  @Input() operationsTemplate: TemplateRef<any>;

  /**
   * set options for create customize operation cell in grid operation
   */
  @Input() operationOption: MasterGridOperationOption = {} as MasterGridOperationOption;

  /**
   * set needed permission to master form elements
   */
  @Input() readonly permission: MasterFormPermission = {} as MasterFormPermission;

  /**
   * when changed grid value fire this event and emit selectedEntity
   */
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  /**
   * when select one of row in grid fire this event and emit gridOptionModel
   */
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('addEditDialog') addEditDialog: MainPanelComponent;
  @ViewChild('gridComponent') readonly gridComponent: GridComponent;
  @ViewChild(TooltipDirective) private tooltipDir: TooltipDirective;
  selectedRow: any = {};
  addEditMainPanel = false;

  /**
   * returned dataItem in row grid
   */
  mySelectionKey(context: any): string {
    return context.dataItem;
  }

  constructor(private ui: UIService, private tr: TranslatorService, private cdr: ChangeDetectorRef) {
    this.valueChange = new EventEmitter<any>();
  }

  @Input()
  get value() {
    return this.controller ? this.controller.selectedMasterEntity : {};
  }

  set value(value) {
    if (this.controller) {
      this.controller.selectedMasterEntity = value;
      this.valueChange.emit(this.controller.selectedMasterEntity);
    }
  }

  showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    const parent = element.offsetParent;
    if (element.nodeName === 'SPAN' && parent.nodeName === 'TH') {
      element.offsetWidth < element.scrollWidth ? this.tooltipDir.toggle(element) : this.tooltipDir.hide();
    }
    if (element.nodeName === 'SPAN' && element.className.includes('grid-cell')) {
      parent.clientWidth < element.offsetWidth ? this.tooltipDir.toggle(parent) : this.tooltipDir.hide();
    }
  }

  ngOnInit(): void {
    this.controller.masterFormComponent = this;
    this.gridOption = this.controller.gridOption;
    this.pagingReq.filters = this.controller.searchFilter;
    this.pagingReq.start = this.gridOption.start;
    this.pagingReq.size = this.gridOption.pageSize;
    if (this.controller.masterFormService.firstLoad) {
      this.controller.masterFormService.firstLoad = false;
      this.startSearch();
    }
  }

  /*
   * set master form labels for main panel & addEdit panel & add button title
   */
  crudPanelSetTitle() {
    if (this.controller.viewMode) {
      return `${'نمایش '}${' '}${this.tr.translate(this.controller.masterFormModel.entityTitle)}`;
    }
    if (this.controller.selectedMasterEntity.id) {
      return `${'ویرایش '}${' '}${this.tr.translate(this.controller.masterFormModel.entityTitle)}`;
    } else {
      return `${'درج'}${' '}${this.tr.translate(this.controller.masterFormModel.entityTitle)}`;
    }
  }

  getSize(width) {
    return `${width}${'%'}`;
  }

  /*
   * when click on search Button in main panel this method called
   */
  searchMasterEntity() {
    this.controller.beforeStartSearching();
    this.startSearch();
    // if (this.controller.masterFormModel.openInPopUp) {
    //   this.controller.masterFormService.firstLoad = false;
    // }
  }

  /*
   * when start search by default this method called
   */
  startSearch() {
    // if (this.controller.masterFormModel.openInPopUp) {
    //   this.controller.masterFormService.firstLoad = false;
    // }
    this.controller.masterFormService.getPage(this.pagingReq).subscribe((res: PagingResponse) => {
      this.gridOption.gridData.data = res.data;
      this.gridOption.gridData.total = res.size;
      this.cdr.detectChanges();
    });
  }
  /*
   * when click on refresh Button in main panel this method called
   */
  refresh() {
    this.gridOption.gridData.data = this.gridOption.mySelection = [];
    this.gridOption.gridData.total = 0;
    this.pagingReq = new PagingRequest();
  }

  /**
   * @param sort[]
   * when click on column header in grid for sorting this method called
   */
  handleSortChange(sort: SortDescriptor[]) {
    this.gridOption.sortSetting = sort;
    this.pagingReq.sort = this.handleOrders(sort[0]);
    this.gridOption.mySelection = [];
    this.startSearch();
    this.selectedRow = {};
    this.selectionChange.emit(this.gridOption);
  }

  /**
   * @param sort
   * create sort object as SortDto using kendo grid SortDescriptor
   */
  handleOrders(sort: SortDescriptor): GridSort {
    const result: GridSort = new GridSort();
    result.fieldName = sort.field;
    result.operation = sort.dir;
    return result;
  }

  /**
   * @param event
   * when click on pagination Button in grid for page change this method called
   */
  handlePageChange(event: PageChangeEvent) {
    this.pagingReq.start = this.gridOption.start = event.skip;
    this.pagingReq.size = this.gridOption.pageSize = event.take;
    this.gridOption.mySelection = [];
    this.selectedRow = {};
    this.startSearch();
    this.selectionChange.emit(this.gridOption);
  }

  /**
   * when select one of rows in grid this method called
   */
  handleSelectionChange(item: SelectionEvent) {
    this.selectedRow = this.gridOption.mySelection[0];
    if (!this.gridOption.mySelection.length) { this.selectedRow = {}; }
    if (item.selectedRows[0]) {
      this.selectedRow = item.selectedRows[0].dataItem;
    }
    this.selectionChange.emit(this.gridOption);
  }

  /**
   * when click on delete button in grid this method called
   */
  deleteSelectedEntity(entity: any) {
    if (entity) {
      this.ui.showConfirm('deleteOperation', 'deleteEntityConfirmation', () => {
        this.controller.masterFormService.delete(entity.id).subscribe((res) => {
          this.startSearch();
        });
      });
    }
  }

  /**
   * when click on show button in grid this method called
   */
  selectEntityInPopupMode(entity: any) {
    this.addEditMainPanel = this.controller.viewMode = true;
    this.controller.selectedMasterEntity = entity;
  }

  /*
   * when click on toggle button in cell grid this method called
   */
  onChangeToggle(field, obj) {
    this.controller.beforeChangeToggle(field, obj);
  }

  /*
   * change grid column status witch use toggle button
   */
  changeToggle(field, obj) {
    this.ui.showConfirm(
      this.tr.translate('eventChangeStatus')
        .replace('{entityTitle}', this.tr.translate(this.controller.masterFormModel.entityTitle)),
      this.tr.translate('eventConfirmationMessage')
        .replace('{eventStatus}', obj[field] ? this.tr.translate('activation') : this.tr.translate('deActivation'))
        .replace('{entityId}', obj.id)
        .replace('{entityTitle}', this.tr.translate(this.controller.masterFormModel.entityTitle))
      , () => {
        if (obj[field]) {
          this.controller.masterFormService.active(this.selectedRow.id).subscribe((data) => {
            this.successToast(field, obj);
            this.startSearch();
          }, (error) => {
            this.selectedRow[field] = !obj[field];
          });
        } else {
          this.controller.masterFormService.inActive(this.selectedRow.id).subscribe((data) => {
            this.successToast(field, obj);
            this.startSearch();
          }, (error) => {
            this.selectedRow[field] = !obj[field];
          });
        }
      }, () => {
        this.selectedRow[field] = !obj[field];
      });
  }

  /*
   * show successful toast message  when changed toggle Button status
   */
  private successToast(field, obj) {
    this.ui.showToast(this.tr.translate('eventChangeStatusSuccessful')
      .replace('{entityTitle}', this.tr.translate(this.controller.masterFormModel.entityTitle))
      .replace('{recordId}', obj.id)
      .replace('{status}', obj[field] ? this.tr.translate('active') : this.tr.translate('inActive')),
      { timer: 10000 });
  }

  /*
   * when click on add Button in main panel this method called
   */
  addNewMasterEntity() {
    this.controller.selectedMasterEntity = {};
    const showDialog = this.controller.beforeEditDialogOpen(this.controller.selectedMasterEntity);
    this.valueChange.emit(this.controller.selectedMasterEntity);
    if (showDialog) {
      this.addEditMainPanel = true;
    }
  }

  /*
   * when click on save button in add mod panel this method called
   */
  saveMasterEntity() {
    this.controller.saveSelected();
    const entity: any = this.controller.selectedMasterEntity;
    const saveOrUpdate = this.controller.beforeSaveEntity(entity);
    if (saveOrUpdate) {
      if (entity.id) {
        this.controller.masterFormService.update(entity)
          .subscribe((res) => {
            this.ui.showToast('successMessage');
            setTimeout(() => {
              this.addEditMainPanel = false;
              this.searchMasterEntity();
            }, 1000);
          });
      } else {
        this.controller.masterFormService.save(entity)
          .subscribe((result) => {
            this.ui.showToast('successMessage');
            setTimeout(() => {
              this.addEditMainPanel = false;
              this.searchMasterEntity();
            }, 1000);
          });
      }
    }
  }

  /*
   * when click on save button in edit mod panel this method called
   */
  editSelectedEntity(entity: any) {
    this.controller.masterFormService.findById(entity.id).subscribe((result) => {
      this.controller.selectedMasterEntity = result;
      this.valueChange.emit(result);
      const showEditPanel = this.controller.beforeEditDialogOpen(this.controller.selectedMasterEntity);
      if (showEditPanel) {
        this.addEditMainPanel = true;
      }
    });
  }

  /*
   * when click on return button in addEdit panel this method called
   */
  backToMain() {
    this.addEditMainPanel = false;
    this.gridOption.mySelection = [];
  }
}
