import { Component, OnInit } from '@angular/core';
import { UIMessageBrokerService } from '../../../../services/ui-message-broker.service';

@Component({
  selector: 'mcb-tooltip',
  templateUrl: './tooltip.component.html',
  styles: [`.test {
  }`]
})
export class PortalTooltipComponent implements OnInit {
  showTooltip = false;
  result;
  style;
  constructor(
    private uiMsgBroker: UIMessageBrokerService) { }

  ngOnInit(): void {
    this.uiMsgBroker.showTooltip.subscribe((res) => {
      if (res) {
        this.showTooltip = true;
        this.result = res.el.innerText;
        this.style = `width: ${res.el.offsetWidth}px;
        left: ${res.position.x - (res.el.offsetLeft / 2)}px;
        top: ${res.position.y - 60}px`;
        // this.style = 'left: 600px; top: 120px';
      } else {
        this.showTooltip = false;
      }
    });
  }

}
