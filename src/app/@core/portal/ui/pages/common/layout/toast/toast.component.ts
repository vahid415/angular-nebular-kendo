import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { StackTraceExceptionDto, ToastData, ToastType } from '../../../../services/types';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  animations: [trigger('fadeInOut', [state('void', style({
    opacity: 0
  })), transition('void <=> *', animate(300))])]
})
export class PortalToastComponent implements OnInit {

  DEFAULT_TIMER = 5000;
  windowTop: number;
  windowLeft: number;
  showInfo = false;
  showSuccess = false;
  showError = false;
  showStackError = false;
  stackTraceBody: StackTraceExceptionDto;
  showWarning = false;
  showValidation = false;
  toastStyle = '';
  data: ToastData;
  toastQueueData: ToastData[];
  windowWith = 300;
  windowHeight = 100;
  stackWindowTop = 100;
  stackWindowLeft = 100;
  stackWindowWidth = 600;
  stackWindowHeight = 400;


  showStackTraceArea = false;

  constructor(private toasterService: ToastService, private router: Router) {
    router.events.subscribe(rout => {
      this.toastQueueData = [];
      this.toasterService.toastQueueData = [];
    });
  }

  ngOnInit() {
    this.setStackWindowPositionCenter();
    this.windowTop = 60;
    this.windowLeft = 5;
    this.toasterService.onShowMessage.subscribe(data => {
      data.forEach(item => {
        this.showValidation = false;
        switch (item.type) {
          case ToastType.INFO: {
            this.showInfo = true;
            item.toastStyle = 'mcb-toast-info';
            if (item.timer == null || item.timer === undefined) {
              item.timer = this.DEFAULT_TIMER;
            }
          }
            break;
          case ToastType.ERROR: {
            item.toastStyle = 'mcb-toast-error';
            item.showError = true;
            if (item.stackTrace) {
              item.showStackError = true;
              this.stackTraceBody = {
                suggestion: item.stackTrace.suggestion,
                message: item.stackTrace.message,
                code: item.stackTrace.code,
                httpStatus: item.stackTrace.httpStatus,
                exceptionMessage: item.stackTrace.exceptionMessage,
                stackTrace: item.stackTrace.stackTrace,
              };
            }
          }
            break;
          case ToastType.SUCCESS: {
            this.showSuccess = true;
            item.toastStyle = 'mcb-toast-success';

            if (item.timer == null || item.timer === undefined) {
              item.timer = this.DEFAULT_TIMER;
            }
          }
            break;
          case ToastType.WARNING: {
            this.showWarning = true;
            item.toastStyle = 'mcb-toast-warning';
            // item.timer = this.DEFAULT_TIMER;
          }
            break;
          case ToastType.VALIDATIONS: {
            // this.showError = true;
            item.toastStyle = 'mcb-toast-validation';
          }
            break;
          default: {
            this.showInfo = true;
            item.toastStyle = 'mcb-toast-info';
          }
        }
      });
      this.toastQueueData = this.managePosition(data);
      this.manageTimer(this.toastQueueData);
    });

  }

  closeToast(item: ToastData) {
    this.toasterService.removeToast(item);
    this.toastQueueData = this.managePosition(this.toastQueueData);
  }


  managePosition(data: any[]): ToastData[] {
    data.forEach(item => {
      const index: number = data.indexOf(item);
      if (index === 0) {
        item.top = 60;
      } else {
        item.top = data[index - 1].top + this.windowHeight + 5;
      }
    });
    return data;
  }

  manageTimer(data: any[]) {
    data.forEach(item => {
      if (item.timer !== undefined || item.timer != null || item.timer !== false) {
        if (item.timer > 0) {
          setTimeout(() => {
            this.closeToast(item);
          }, item.timer);
        }
      }
    });
  }

  // setTimer(item: ToastData) {
  //   alert(item.timer);
  //   setTimeout(() => {
  //     this.toasterService.removeToast(item);
  //     this.toastQueueData = this.managePosition(this.toastQueueData);
  //   }, item.timer);
  // }

  checkStackTrace() {
    this.showStackTraceArea = true;
  }

  private setStackWindowPositionCenter() {
    const layoutWith = window.innerWidth;
    const layoutHeight = window.innerHeight;
    this.stackWindowTop = (layoutHeight - this.stackWindowHeight) / 4;
    this.stackWindowLeft = (layoutWith - this.stackWindowWidth) / 2;
  }
}
