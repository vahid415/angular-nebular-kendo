import { Component, OnInit } from '@angular/core';

import { UserAreaLayoutService } from '../../user-area-layout.service';
import { UserIdentityService } from './../../../../../../security/authentication/user-identity.service';

@Component({
  selector: 'app-portal-user-area-footer',
  templateUrl: './footer.component.html'
})
export class PortalUserAreaFooterComponent implements OnInit {
  userBranch: string;
  organizationTitle: string;
  public showSidebarClass = '';
  constructor(private layoutService: UserAreaLayoutService,
    private userIdentity: UserIdentityService,
  ) { }

  ngOnInit() {
    this.userBranch = this.userIdentity.user.activeOrganizationTitle;
    this.organizationTitle = this.userIdentity.user.activeOrganizationTitle;
    this.layoutService.sideBarToggle.subscribe((showSidebar: any) => {
      if (!showSidebar) {
        this.showSidebarClass = 'mcb-sidebar-hide';
      } else {
        this.showSidebarClass = '';
      }
    });
  }
}
