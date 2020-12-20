import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NbMenuService } from '@nebular/theme';
import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';

import { MenuClickEvent } from '../../../../../services/types';
import { UserAreaLayoutService } from '../../user-area-layout.service';
import { EventBusService } from '../../../../../services/event-bus.service';
import { MessageBusGroup } from './../../../../../services/event-bus.service';
import { NavigationService } from '../../../../../services/navigation.service';
import { UIMessageBrokerService } from '../../../../../services/ui-message-broker.service';
import { UserIdentityService } from '../../../../../../security/authentication/user-identity.service';
import { AuthenticationService } from '../../../../../../security/authentication/authentication.service';
import { TranslatorService } from './../../../../../../../infra/shared/localization/lang/translator.service';
import { Environment, EnvironmentDescriptor } from '../../../../../../../infra/shared/types/environment';


@Component({
  selector: 'app-portal-user-area-status',
  templateUrl: './user-status.component.html',
  styles: [

  ]
})
export class PortalUserAreaUserStatusComponent implements OnInit, OnDestroy {

  showUserStatusPanel = false;
  userFullName: string;
  organizationTitle: string;
  menuServiceSubscription: Subscription;
  messageBusGroupSubscription: MessageBusGroup;

  userMenu = [
    { data: { id: 'cartable' }, title: 'مشاهده کارتابل', icon: 'grid-outline' },
    { data: { id: 'profile' }, icon: 'person-outline', title: 'پروفایل' },
    { data: { id: 'change-password' }, icon: 'lock', title: 'تغییرکلمه عبور' },
    { data: { id: 'log-out' }, icon: 'swap-outline', title: 'خروج' } ];
  userImg;
  normal = 'normal';
  inverse = 'inverse';
  @Input() position = 'normal';
  private messageBusGroup: MessageBusGroup;
  constructor (
    @Inject(Environment) private env: EnvironmentDescriptor,
    private userIdentity: UserIdentityService,
    private userAuthService: AuthenticationService,
    private layoutService: UserAreaLayoutService,
    private navService: NavigationService,
    private menuService: NbMenuService,
    private tr: TranslatorService,
    private uiMsgBroker: UIMessageBrokerService,
    private messageBusService: EventBusService) {
    this.messageBusGroup = this.messageBusService.group();
    this.messageBusGroupSubscription = this.messageBusGroup.on(
      MenuClickEvent,
      (event): void => {
        switch (event.payload.id) {
          case 'cartable':
            this.navService.goToDashboardPage();
            break;
          case 'profile':
            // this.navService.goToProfilePage();
            break;
          case 'change-password':
            this.onChangePassClick();
            break;
          case 'log-out':
            this.onSignOutClick();
            break;
        }
      }
    );
  }

  ngOnInit() {
    this.userFullName = this.userIdentity.user.fullName;
    this.organizationTitle = this.userIdentity.user.activeOrganizationTitle;
    this.userImg = 'assets/template/img/profile.svg';
    this.layoutService.userStatusToggle.subscribe(userStatusPanel => {
      this.showUserStatusPanel = userStatusPanel;
    });
    this.menuServiceSubscription = this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-header-context-menu')
      )
      .subscribe(menu => {
        this.messageBusGroup.emit(new MenuClickEvent(menu[ 'item' ].data));

      });
  }

  onChangePassClick() {
    this.uiMsgBroker.showChangePassWindow.emit(true);
  }

  onSignOutClick() {
    this.userAuthService.signOut().subscribe(x => {
      this.navService.goToSignInPage();
    });
  }

  // @HostListener('click', ['$event']) clickInside(event) {
  //   this.layoutService.toggleUserStatus();
  // }

  // @HostListener('document:click', ['$event']) clickout(event) {
  //   const el = event.target as HTMLElement;
  //   if (!this.existingForDocumentClick(el.className)) {
  //     if (this.layoutService.getUserStatusStatus()) {
  //       this.layoutService.hideUserStatus();
  //     }
  //   }
  // }

  // private existingForDocumentClick(className) {
  //   let result = false;
  //   const listOfClass: string[] =
  //     ['mcb-user-status', 'mcb-user-avatar', 'mcb-user-title', 'mcb-user-panel', 'mcb-user-panel-header', 'mcb-user-panel-menu'];
  //   listOfClass.forEach(l => {
  //     if (l === className) {
  //       result = true;
  //     }
  //   });
  //   return result;
  // }

  ngOnDestroy() {
    if (this.messageBusGroupSubscription) { this.messageBusGroupSubscription.unsubscribe(); }
    if (this.menuServiceSubscription) { this.menuServiceSubscription.unsubscribe(); }
  }
}
