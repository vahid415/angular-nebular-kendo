import { ViewContainerRef } from '@angular/core';
import { Position } from '@progress/kendo-angular-notification';

import { EventWithPayload } from './event-bus.service';

export interface Toast {
  textKey: string;
  extraOptions?: {
    style?: 'info' | 'success' | 'error' | 'warning';
    timer?: number;
    closable?: boolean;
    position?: Position,
    appendTo?: ViewContainerRef
  };
}

export enum ToastType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  NONE = 'none',
  VALIDATIONS = 'validation',
}

export interface ConfirmMessage {
  title?: string;
  text: string;
  accept?: () => any;
  reject?: () => any;
}

export class MenuModel {
  id: string;
  name: string;
  action: Function;

  constructor(id: string, name: string, action: Function) {
    this.id = id;
    this.name = name;
    this.action = action;
  }
}

export class MenuClickEvent extends EventWithPayload<MenuModel> {
  readonly type = 'menuClickType';
}




//// ------- Deprecated Models -----------/////////////////
/** Deprecated */
export interface ConfirmationDto {
  message?: string;
  title?: string;
  accept?: any; // Function;
  reject?: any;
  type?: 'danger' | 'warning';
  acceptTitle?: string;
  rejectTitle?: string;
  // acceptIconClass?: string;
  // rejectIconClass?: string;
  // acceptEvent?: EventEmitter<any>;
  // rejectEvent?: EventEmitter<any>;
}

/** Deprecated */
export interface StackTraceDto {
  methodName: string;
  fileName: string;
  lineNumber: number;
  className: string;
  nativeMethod: boolean;
}

/** Deprecated */
export interface StackTraceExceptionDto {
  message: string;
  code: string;
  suggestion: string;
  httpStatus: string;
  exceptionMessage: string;
  stackTrace: StackTraceDto[];
}

/** Deprecated */
export interface ToastData {
  timer?: number | boolean; // millisecond
  title?: string;
  message?: string;
  validationMessages?: string[];
  type?: ToastType;
  stackTrace?: StackTraceExceptionDto;
}

/** Deprecated */
export interface ToastMessage {
  // title?: string;
  textKey: string;
}
