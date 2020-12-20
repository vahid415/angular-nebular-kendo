import { EventEmitter, Injectable, Output } from '@angular/core';
import { ToastMessage, ConfirmMessage } from './types';

@Injectable({
  providedIn: 'root'
})
export class UIMessageBrokerService {
  @Output() confirm = new EventEmitter<ConfirmMessage>();
  @Output() showLoading = new EventEmitter<boolean>();
  @Output() showModal = new EventEmitter<any>();
  @Output() showTooltip = new EventEmitter<any>();
  @Output() showChangePassWindow = new EventEmitter<any>();
}
