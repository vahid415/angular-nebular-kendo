import { EventEmitter, Injectable, Output } from '@angular/core';
import { ToastData, ToastType } from './types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onShowMessage = new EventEmitter<ToastData[]>();

  toastQueueData: ToastData[] = [];

  info(data: ToastData) {
    data.type = ToastType.INFO;
    this.toastQueueData.push(data);
    // this.onShowMessage.emit(data);
    this.onShowMessage.emit(this.toastQueueData);
  }

  warning(data: ToastData) {
    data.type = ToastType.WARNING;
    // this.onShowMessage.emit(data);
    this.toastQueueData.push(data);
    this.onShowMessage.emit(this.toastQueueData);
  }

  error(data: ToastData) {
    data.type = ToastType.ERROR;
    // this.onShowMessage.emit(data);
    this.toastQueueData.push(data);
    this.onShowMessage.emit(this.toastQueueData);
  }

  validations(data: ToastData) {
    data.type = ToastType.VALIDATIONS;
    this.toastQueueData.push(data);
    this.onShowMessage.emit(this.toastQueueData);
  }

  success(data: ToastData) {
    data.type = ToastType.SUCCESS;
    // this.onShowMessage.emit(data);
    this.toastQueueData.push(data);
    this.onShowMessage.emit(this.toastQueueData);
  }

  removeToast(data: ToastData) {
    const index: number = this.toastQueueData.indexOf(data);
    if (index > -1) {
      this.toastQueueData.splice(index, 1);
    }
  }
}
