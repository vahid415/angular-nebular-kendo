import { NavigationService } from './../../../../../services/navigation.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserAreaLayoutService } from '../../user-area-layout.service';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-portal-user-area-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class PortalUserAreaHeaderComponent implements OnInit {
  @Output() toggleProfile: EventEmitter<any> = new EventEmitter();
  public showSidebarClass = '';
  constructor(private layoutService: UserAreaLayoutService,
    private sidebarService: NbSidebarService,
    private navigate: NavigationService
  ) {
  }

  ngOnInit() {
    this.layoutService.sideBarToggle.subscribe(showSidebar => {
      if (!showSidebar) {
        this.showSidebarClass = 'mcb-sidebar-hide';
      } else {
        this.showSidebarClass = '';
      }
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.toggleProfile.emit();
    return false;
  }

  goToHome() {
    this.navigate.goToDashboardPage();
  }

  onHeaderToggleClick() {
    this.layoutService.openSideBar();
  }
}
