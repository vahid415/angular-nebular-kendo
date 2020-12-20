import { Component, EventEmitter, OnInit } from '@angular/core';
import { ConfirmationDto, ConfirmMessage } from '../../../../services/types';
import { McbConfirmationService } from '../../../../services/mcb-confirmation.service';
import { UIMessageBrokerService } from '../../../../services/ui-message-broker.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class PortalConfirmationDialogComponent {
  title: string;
  text: string;
  confirmation: ConfirmationDto; // Depricated
  message: ConfirmMessage;
  showDialog = false;

  constructor(
    private confirmationService: McbConfirmationService,
    private uiMsgBroker: UIMessageBrokerService,
  ) {
    // Depricated
    this.confirmationService._open.subscribe(c => {
      this.confirmation = c;
      this.title = c.title;
      this.text = c.message;
      this.showDialog = true;
    });

    this.uiMsgBroker.confirm.subscribe((msg: ConfirmMessage) => {
      this.message = msg;
      this.title = msg.title;
      this.text = msg.text;
      this.showDialog = true;
    });
  }

  accept() {
    if (this.confirmation && typeof this.confirmation.accept === 'function') {
      this.confirmation.accept();
    } else if (this.message && typeof this.message.accept === 'function') {
      this.message.accept();
    }
    this.showDialog = false;
    this.confirmation = null;
  }

  reject() {
    if (this.confirmation && typeof this.confirmation.reject === 'function') {
      this.confirmation.reject();
    } else if (this.message && typeof this.message.reject === 'function') {
      this.message.reject();
    }
    this.showDialog = false;
    this.confirmation = null;
  }
}
