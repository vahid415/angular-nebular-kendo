import { Component, ViewEncapsulation, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { UIMessageBrokerService } from '../../../services/ui-message-broker.service';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PortalLayoutComponent implements AfterContentChecked {
  showLoading: boolean;

  constructor(private ui: UIMessageBrokerService,
    private cdr: ChangeDetectorRef) {
    ui.showLoading.subscribe((x: boolean) => this.showLoading = x);
  }

  ngAfterContentChecked() { this.cdr.detectChanges(); }

}
