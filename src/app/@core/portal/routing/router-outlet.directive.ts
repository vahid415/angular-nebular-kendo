import { Directive, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComponentTreeService } from './component-tree-service';

@Directive({
  selector: '[mcbRouterOutlet]',
  exportAs: 'mcbRouterOutlet',
})
export class RouterOutletDirective implements OnDestroy {
  private activateSubscription: Subscription;
  private deactivateSubscription: Subscription;

  constructor(
    outlet: RouterOutlet,
    componentTreeService: ComponentTreeService
  ) {
    this.activateSubscription = outlet.activateEvents.subscribe(comp => {
      componentTreeService.push(comp);
    });

    this.deactivateSubscription = outlet.deactivateEvents.subscribe(comp => {
      componentTreeService.pop();
    });
  }

  ngOnDestroy(): void {
    this.activateSubscription.unsubscribe();
    this.deactivateSubscription.unsubscribe();
  }
}
