import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserAreaLayoutService } from './user-area-layout.service';

@Component({
  selector: 'app-portal-user-area',
  templateUrl: './user-area-layout.component.html',
  styleUrls: ['./user-area-layout.component.css'],
})
export class PortalUserAreaLayoutComponent implements OnInit {
  showSidebarClass = '';

  @ViewChild('contentArea', { read: ViewContainerRef }) set contentAreaViewContainerRef(value: ViewContainerRef) {
    this.userAreaLayoutService.contentAreaViewContainerRef = value;
  }

  constructor(private userAreaLayoutService: UserAreaLayoutService) {
  }

  ngOnInit() {
    this.userAreaLayoutService.sideBarToggle.subscribe((showSidebar: any) => {
      this.showSidebarClass = showSidebar ? '' : 'mcb-sidebar-hide';
    });
  }
}
