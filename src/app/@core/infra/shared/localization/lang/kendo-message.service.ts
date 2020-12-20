import { MessageService } from '@progress/kendo-angular-l10n';
import { Injectable } from '@angular/core';

const FA_NO_DATA_FOUND = 'داده ای یافت نشد';
const FA_CLEAR_TITLE = 'پاک سازی';
const NORECORDS = ' داده ای یافت نشد';
const GROUPPANELEMPTY = 'جهت ستون بندی ستون مورد نظر را در این قسمت بکشید';
const PAGERFIRSTPAGE = 'برو به صفحه اول';
const PAGERPREVIOUSPAGE = ' برو به صفحه قبل';
const PAGERNEXTPAGE = ' برو به صفحه بعد';
const PAGERLASTPAGE = ' برو به صفحه آخر';
const PAGERPAGE = ' صفحه';
const PAGEROF = ' از';
const PAGERITEMS = '';
const PAGERITEMSPERPAGE = '  سطر در صفحه';
const FILTER = ' فیلتر';
const FILTEREQOPERATOR = ' مساوی با';
const FILTERNOTEQOPERATOR = ' نامساوی با';
const FILTERISNULLOPERATOR = ' باشد null';
const FILTERISNOTNULLOPERATOR = ' null نباشد';
const FILTERISEMPTYOPERATOR = ' خالی باشد';
const FILTERISNOTEMPTYOPERATOR = ' خالی نباشد';
const FILTERSTARTSWITHOPERATOR = ' شروع با';
const FILTERCONTAINSOPERATOR = ' شامل';
const FILTERNOTCONTAINSOPERATOR = ' شامل نباشد';
const FILTERENDSWITHOPERATOR = ' پایان با';
const FILTERGTEOPERATOR = ' بزرگتر مساوی';
const FILTERGTOPERATOR = ' بزرگتر از';
const FILTERLTEOPERATOR = ' کوچکتر مساوی';
const FILTERLTOPERATOR = ' کوچکتر از';
const FILTERISTRUE = ' درست';
const FILTERISFALSE = ' نادرست';
const FILTERBOOLEANALL = ' (همه)';
const FILTERAFTEROREQUALOPERATOR = ' بعد از یا مساوی';
const FILTERAFTEROPERATOR = ' بعد از';
const FILTERBEFOREOPERATOR = ' قبل از';
const FILTERBEFOREOREQUALOPERATOR = ' قبل از یا مساوی';
const FILTERFILTERBUTTON = ' فیلتر';
const FILTERCLEARBUTTON = ' Clear';
const FILTERANDLOGIC = ' و';
const FILTERORLOGIC = ' یا';
const LOADING = ' در حال ارسال';
const SORT = ' مرتب';
const COLUMNMENU = ' منوی ستون';
const COLUMNS = ' ستون ها';
const LOCK = ' قفل';
const UNLOCK = ' باز';
const SORTASCENDING = ' مرتب - صعودی';
const SORTDESCENDING = ' مرتب - نزولی';
const COLUMNSAPPLY = 'اعمال';
const COLUMNSRESET = ' مجدد';
const INCREMENT = 'افزایش';
const DECREMENT = 'کاهش';
const CANCEL = 'انصراف';
const CLEARSELECTEDFILES = 'پاک سازی';
const DROPFILESHERE = 'جهت بار گذاری فایل را اینجا بکشید';
const HEADERSTATUSUPLOADED = 'بارگذاری با موفقیت انجام شد';
const HEADERSTATUSUPLOADING = 'در حال آپلود ...';
const INVALIDFILEEXTENSION = 'نوع فایل یافت نشد';
const INVALIDFILES = 'فایل معتبر نیست';
const INVALIDMAXFILESIZE = 'حجم فایل خیل زیاد است';
const INVALIDMINFILESIZE = 'حجم فایل خیلی کم است';
const REMOVE = 'حذف';
const RETRY = 'تلاش مجدد';
const SELECT = 'انتخاب فایل ...';
const UPLOADSELECTEDFILES = 'بارگزاری فایل';
const NOW = 'اکنون';
const ACCEPT = 'تایید';

const data = {
  fa: {
    rtl: true,
     messages: {
      'kendo.autocomplete.noDataText': FA_NO_DATA_FOUND,
      'kendo.autocomplete.clearTitle': FA_CLEAR_TITLE,
      'kendo.combobox.noDataText': FA_NO_DATA_FOUND,
      'kendo.combobox.clearTitle': FA_CLEAR_TITLE,
      'kendo.dropdownlist.noDataText': FA_NO_DATA_FOUND,
      'kendo.dropdownlist.clearTitle': FA_CLEAR_TITLE,
      'kendo.multiselect.noRecords': FA_NO_DATA_FOUND,

      'kendo.grid.groupPanelEmpty': GROUPPANELEMPTY,
      'kendo.grid.noRecords': NORECORDS,
      'kendo.grid.pagerFirstPage': PAGERFIRSTPAGE,
      'kendo.grid.pagerPreviousPage': PAGERPREVIOUSPAGE,
      'kendo.grid.pagerNextPage': PAGERNEXTPAGE,
      'kendo.grid.pagerLastPage': PAGERLASTPAGE,
      'kendo.grid.pagerPage': PAGERPAGE,
      'kendo.grid.pagerOf': PAGEROF,
      'kendo.grid.pagerItems': PAGERITEMS,
      'kendo.grid.pagerItemsPerPage': PAGERITEMSPERPAGE,
      'kendo.grid.filter': FILTER,
      'kendo.grid.filterEqOperator': FILTEREQOPERATOR,
      'kendo.grid.filterLtOperator': FILTERLTOPERATOR,
      'kendo.grid.filterNotEqOperator': FILTERNOTEQOPERATOR,
      'kendo.grid.filterIsNullOperator': FILTERISNULLOPERATOR,
      'kendo.grid.filterIsNotNullOperator': FILTERISNOTNULLOPERATOR,
      'kendo.grid.filterIsEmptyOperator': FILTERISEMPTYOPERATOR,
      'kendo.grid.filterIsNotEmptyOperator': FILTERISNOTEMPTYOPERATOR,
      'kendo.grid.filterStartsWithOperator': FILTERSTARTSWITHOPERATOR,
      'kendo.grid.filterContainsOperator': FILTERCONTAINSOPERATOR,
      'kendo.grid.filterNotContainsOperator': FILTERNOTCONTAINSOPERATOR,
      'kendo.grid.filterEndsWithOperator': FILTERENDSWITHOPERATOR,
      'kendo.grid.filterGteOperator': FILTERGTEOPERATOR,
      'kendo.grid.filterGtOperator': FILTERGTOPERATOR,
      'kendo.grid.filterLteOperator': FILTERLTEOPERATOR,
      'kendo.grid.filterIsTrue': FILTERISTRUE,
      'kendo.grid.filterIsFalse': FILTERISFALSE,
      'kendo.grid.filterBooleanAll': FILTERBOOLEANALL,
      'kendo.grid.filterAfterOrEqualOperator': FILTERAFTEROREQUALOPERATOR,
      'kendo.grid.filterAfterOperator': FILTERAFTEROPERATOR,
      'kendo.grid.filterBeforeOperator': FILTERBEFOREOPERATOR,
      'kendo.grid.filterBeforeOrEqualOperator': FILTERBEFOREOREQUALOPERATOR,
      'kendo.grid.filterFilterButton': FILTERFILTERBUTTON,
      'kendo.grid.filterClearButton': FILTERCLEARBUTTON,
      'kendo.grid.filterAndLogic': FILTERANDLOGIC,
      'kendo.grid.filterOrLogic': FILTERORLOGIC,
      'kendo.grid.loading': LOADING,
      'kendo.grid.sort': SORT,
      'kendo.grid.columnMenu': COLUMNMENU,
      'kendo.grid.columns': COLUMNS,
      'kendo.grid.lock': LOCK,
      'kendo.grid.unlock': UNLOCK,
      'kendo.grid.sortAscending': SORTASCENDING,
      'kendo.grid.sortDescending': SORTDESCENDING,
      'kendo.grid.columnsApply': COLUMNSAPPLY,
      'kendo.grid.columnsReset': COLUMNSRESET,

      'kendo.numerictextbox.increment': INCREMENT,
      'kendo.numerictextbox.decrement': DECREMENT,

      'kendo.upload.cancel': CANCEL,
      'kendo.upload.clearSelectedFiles': CLEARSELECTEDFILES,
      'kendo.upload.dropFilesHere': DROPFILESHERE,
      'kendo.upload.headerStatusUploaded': HEADERSTATUSUPLOADED,
      'kendo.upload.headerStatusUploading': HEADERSTATUSUPLOADING,
      'kendo.upload.invalidFileExtension': INVALIDFILEEXTENSION,
      'kendo.upload.invalidFiles': INVALIDFILES,
      'kendo.upload.invalidMaxFileSize': INVALIDMAXFILESIZE,
      'kendo.upload.invalidMinFileSize': INVALIDMINFILESIZE,
      'kendo.upload.remove': REMOVE,
      'kendo.upload.retry': RETRY,
      'kendo.upload.select': SELECT,
      'kendo.upload.uploadSelectedFiles': UPLOADSELECTEDFILES,

      'kendo.timepicker.accept': ACCEPT,
      'kendo.timepicker.now': NOW,
      'kendo.timepicker.cancel': CANCEL
    }
  }
};

@Injectable()
export class KendoMessageService extends MessageService {
  private localeId = 'fa';

  public set language(value: string) {
    const lang = data[value];
    if (lang) {
      this.localeId = value;
      this.notify(lang.rtl);
    }
  }

  public get language(): string {
    return this.localeId;
  }


  private get messages(): any {
    const lang = data[this.localeId];

    if (lang) {
      return lang.messages;
    }
  }

  public get(key: string): string {
    return this.messages[key];
  }
}
