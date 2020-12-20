import { EventEmitter, Injectable, Output, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAreaLayoutService {
  showSideBar = true;
  showSidebarOnResponsiveView = false;
  showUserStatusPanel = false;
  contentAreaViewContainerRef: ViewContainerRef;
  @Output() sideBarToggle = new EventEmitter<boolean>();
  @Output() headerBarToggle = new EventEmitter<boolean>();
  @Output() userStatusToggle = new EventEmitter<boolean>();

  constructor() {
  }

  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
    this.sideBarToggle.emit(this.showSideBar);
  }

  openSideBar() {
    this.showSidebarOnResponsiveView = true;
    this.headerBarToggle.emit(this.showSidebarOnResponsiveView);
  }

  closeSideBar() {
    this.showSidebarOnResponsiveView = false;
    this.headerBarToggle.emit(this.showSidebarOnResponsiveView);
  }

  toggleUserStatus() {
    this.showUserStatusPanel = !this.showUserStatusPanel;
    this.userStatusToggle.emit(this.showUserStatusPanel);
  }
  hideUserStatus() {
    this.showUserStatusPanel = false;
    this.userStatusToggle.emit(this.showUserStatusPanel);
  }

  getUserStatusStatus() {
    return this.showUserStatusPanel;
  }

}
