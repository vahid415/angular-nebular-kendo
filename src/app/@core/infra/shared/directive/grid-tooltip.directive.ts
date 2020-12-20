import { PopupRef, PopupService, Collision } from '@progress/kendo-angular-popup';
import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { UIMessageBrokerService } from '../../../portal/ui/services/ui-message-broker.service';

@Directive({
  selector: '[mcbGridTooltip]'
})
export class McbGridTooltipDirective {
  dir: TooltipDirective;
  // @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  position = 'top';
  collision: Collision = { horizontal: 'fit', vertical: 'fit' };
  offset = 6;
  popupRef: PopupRef;

  constructor(
    private uiMsgBroker: UIMessageBrokerService,
    private popupService: PopupService) {
  }
  @Input() set mcbGridTooltip(dir: TooltipDirective) {
    this.dir = dir;
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(e: MouseEvent, ) {
    const element = e.target as HTMLElement;
    let anchor = e.target as ElementRef | Element;
    if (anchor instanceof Element) {
      anchor = { nativeElement: anchor };
    }
    if ((element.nodeName === 'TD' || element.nodeName === 'TH' || element.nodeName === 'SPAN' || element.nodeName === 'A')
      && element.offsetWidth < element.scrollWidth) {
      this.dir.toggle(element);
      // this.uiMsgBroker.showTooltip.emit({ el: element, position: e });
      // const alignSettings = align(this.position, this.offset);
      // const anchorAlign = alignSettings.anchorAlign;
      // const popupMargin = alignSettings.popupMargin;
      // const popupAlign = alignSettings.popupAlign;
      // this.popupRef = this.popupService.open({
      //   anchor: anchor,
      //   anchorAlign,
      //   animate: false,
      //   content: TooltipContentComponent,
      //   collision: collision(this.collision, this.position),
      //   margin: popupMargin,
      //   popupAlign,
      //   popupClass: 'k-popup-transparent'
      // });

    } else {
      this.dir.hide();
      // this.uiMsgBroker.showTooltip.emit(null);
    }
  }
}
