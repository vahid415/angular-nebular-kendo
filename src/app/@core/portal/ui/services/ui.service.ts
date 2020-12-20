import { Injectable, ViewContainerRef } from '@angular/core';
import { Position } from '@progress/kendo-angular-notification';
import { NotificationService } from '@progress/kendo-angular-notification';

import { ConfirmMessage, Toast, } from './types';
import { UIMessageBrokerService } from './ui-message-broker.service';
import { TranslatorService } from '../../../infra/shared/localization/lang/translator.service';


@Injectable({
  providedIn: 'root'
})
export class UIService {
  constructor(
    private messageBroker: UIMessageBrokerService,
    private notificationService: NotificationService,
    private translator: TranslatorService
  ) {
  }

  showConfirm(titleKey: string, textKey: string, accept?: () => any, reject?: () => any) {
    this.messageBroker.confirm.emit({
      title: this.translator.translate(titleKey),
      text: this.translator.translate(textKey),
      accept,
      reject
    } as ConfirmMessage);
  }

  showModal(
    textKey: string,
    extraOptions?: {
      style?: 'success' | 'warning' | 'info' | 'error',
      timer?: number,
    }) {
    const modelObj = {
      textKey: this.translator.translate(textKey),
      extraOptions: {
        style: extraOptions && extraOptions.style ? extraOptions.style : 'error',
        timer: extraOptions && extraOptions.timer ? extraOptions.timer : null,
      }
    } as Toast;
    this.messageBroker.showModal.emit(modelObj);
  }

  showToast(
    textKey: string,
    extraOptions?: {
      style?: 'success' | 'warning' | 'info' | 'error',
      timer?: number,
      closable?: boolean,
      position?: Position,
      appendTo?: ViewContainerRef
    }) {
    this.notificationService.show({
      content: this.translator.translate(textKey),
      hideAfter: extraOptions && extraOptions.timer,
      closable: extraOptions && extraOptions.closable ? extraOptions.closable : false,
      cssClass: 'kendo-toast-notification',
      animation: {
        duration: 100,
        type: 'slide'
      },
      appendTo: extraOptions && extraOptions.appendTo ? extraOptions.appendTo : null,
      position: extraOptions && extraOptions.position ? extraOptions.position : {
        horizontal: 'left',
        vertical: 'top'
      },
      type: {
        style: extraOptions && extraOptions.style ? extraOptions.style : 'success'
      }
    });
  }

  showLoading(show: boolean = true) {
    this.messageBroker.showLoading.emit(show);
  }
}
