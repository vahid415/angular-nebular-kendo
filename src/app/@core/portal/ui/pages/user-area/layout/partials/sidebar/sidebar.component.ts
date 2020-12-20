import { Component, OnInit, Inject } from '@angular/core';

import { UserIdentity } from '../../../../../../security/types';
import { SubsystemManager } from '../../../../../../subsystem/subsystem-manager.service';
import { MenuItems, LOCALIZED_MENU_ITEM_TITLE_SYMBOL } from '../../../../../../subsystem/types';
import { UserIdentityService } from '../../../../../../security/authentication/user-identity.service';
import { Environment, EnvironmentDescriptor } from '../../../../../../../infra/shared/types/environment';
import { NbMenuService, NbThemeService, NbSidebarService, NbMediaBreakpointsService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-portal-user-area-sidebar',
  templateUrl: 'sidebar.component.html',
  styles: [`
  .mcb-side-search-hide{
    position: absolute;
    left: 35px;
    top: 34px;
  }`]
})
export class PortalUserAreaSidebarComponent implements OnInit {
  showSidebarClass = '';
  showSidebarOnResponsiveClass = '';
  showSidebarStatus = true; // true = defaultSidebar --- false = hideSidebar
  grantedItems: NbMenuItem[] = [];
  private user: UserIdentity;
  titleSymbol = LOCALIZED_MENU_ITEM_TITLE_SYMBOL;
  fakeAuthentication: boolean;
  private alive = true;
  // expandMode: number = PanelBarExpandMode.Full;

  constructor(
    private userIdentityService: UserIdentityService,
    private subsystemManager: SubsystemManager,
    private menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected sidebarService: NbSidebarService,
    protected bpService: NbMediaBreakpointsService,
    @Inject(Environment) private env: EnvironmentDescriptor,
  ) {
    this.user = userIdentityService.user;
    let menuItems: MenuItems = [];
    subsystemManager.subsystems
      .filter(ss => Array.isArray(ss.menuItems))
      .forEach(ss => menuItems = menuItems.concat(ss.menuItems));
    this.fakeAuthentication = env.useFakeAuthenticationProvider;
    this.grantedItems = this.getGrantedItems(menuItems);
    // const isBp = this.bpService.getByName('is');
    // this.menuService.onItemSelect()
    //   .pipe(
    //     takeWhile(() => this.alive),
    //     withLatestFrom(this.themeService.onMediaQueryChange()),
    //     delay(20)
    //   )
    //   .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

    //     if (bpTo.width <= isBp.width) {
    //       this.sidebarService.collapse('menu-sidebar');
    //     }
    //   });
  }

  ngOnInit() {
    // this.layoutService.sideBarToggle.subscribe(showSidebar => {
    //   if (!showSidebar) {
    //     this.showSidebarClass = 'mcb-sidebar-hide';
    //   } else {
    //     this.showSidebarClass = '';
    //   }
    //   this.showSidebarOnResponsiveClass = '';
    // });

    // this.layoutService.headerBarToggle.subscribe(openSideBar => {
    //   if (openSideBar) {
    //     this.showSidebarOnResponsiveClass = 'mcb-sidebar-open';
    //   } else {
    //     this.showSidebarOnResponsiveClass = '';
    //   }
    //   this.showSidebarClass = '';
    // });
  }

  // routeChange(data) {
  //   const focused: PanelBarItemModel = data.filter(item => item.focused === true)[0];
  //   if (focused && focused.id !== '0') {
  //     this.router.navigate(['/user/sys/' + focused.id]);
  //   }
  // }

  private getGrantedItems(items: MenuItems) {
    const grantedItems: NbMenuItem[] = [];
    items.forEach(x => {
      if (Array.isArray(x.children)) {
        const grantedChildren = this.getGrantedItems(x.children);
        if (grantedChildren.length > 0) {
          const clonedItem: any = Object.assign({}, x);
          clonedItem.title = x[LOCALIZED_MENU_ITEM_TITLE_SYMBOL];
          clonedItem.children = grantedChildren;
          grantedItems.push(clonedItem);
        }
      } else if (!x.permission || this.fakeAuthentication || this.user.hasPermission(x.permission)) {
        const clonedItem: any = Object.assign({}, x);
        clonedItem.title = x[LOCALIZED_MENU_ITEM_TITLE_SYMBOL];
        clonedItem.link = '/user/sys/' + x.path;
        grantedItems.push(clonedItem);
      }
    });
    return grantedItems;
  }

  // showHideSidebar() {
  //   this.layoutService.toggleSideBar();
  // }

  // closeResponsiveSideBar() {
  //   this.layoutService.closeSideBar();
  // }
}
