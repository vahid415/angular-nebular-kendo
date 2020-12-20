import { Component, OnInit } from '@angular/core';

import { Toast } from '../../../../services/types';
import { UIMessageBrokerService } from '../../../../services/ui-message-broker.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class PortalModalComponent implements OnInit {
  showModal = false;
  result: Toast;
  constructor(
    private uiMsgBroker: UIMessageBrokerService) { }

  ngOnInit(): void {
    this.uiMsgBroker.showModal.subscribe((res: Toast) => {
      this.showModal = true;
      this.result = res;
    });
  }
}
