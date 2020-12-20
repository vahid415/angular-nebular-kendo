import { Component } from '@angular/core';

import { OrganizationDto } from './../../../../security/types';
import { NavigationService } from '../../../services/navigation.service';
import { AuthenticationService } from '../../../../security/authentication/authentication.service';

@Component({
  selector: 'mcb-choose-organization',
  templateUrl: './choose-organization.component.html',
  styleUrls: ['./choose-organization.component.scss']
})
export class PortalLoginChooseOrganizationComponent {
  orgs: OrganizationDto[] = [];
  selectedOrg: OrganizationDto;
  defaultItem = { title: 'انتخاب کنید', id: undefined };

  constructor(
    private authService: AuthenticationService,
    private navService: NavigationService) {
    this.authService.getUserOrganizations().then(x => this.orgs = x);
  }

  async login() {
    this.authService.setUserOrganization(this.selectedOrg)
      .subscribe(async res => {
        await this.navService.goToAppropriateSecurityPageOrDashboard();
      });
  }
}
