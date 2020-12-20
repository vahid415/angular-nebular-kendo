import { Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WindowRef, WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-window',
  templateUrl: './mcb-window.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => McbWindowComponent), multi: true }
  ]
})
export class McbWindowComponent implements OnInit, ControlValueAccessor {
  _show = true;
  @Input() autoFocusedElement: string;
  @Input() title: string;
  @Input() draggable = true;
  @Input() resizable = false;
  @Input() keepContent: boolean;
  @Input() showClose = true;
  @Input() showMin = false;
  @Input() showMax = false;
  @Input() minWidth: number;
  @Input() minHeight: number;
  @Input() width = 500;
  @Input() height = 400;
  @Input() top = 100;
  @Input() left = 100;

  @Input() positionCenter = true;
  @Input() modal = false;
  showModal = false;

  @ViewChild('windowArea') windowArea: TemplateRef<any>;
  @ViewChild('windowTitleBar') windowTitleBar: TemplateRef<any>;
  windowRef: WindowRef;

  @Output() close: EventEmitter<any> = new EventEmitter();


  private onChangeCallback: any = () => {
  }
  private onTouchedCallback: any = () => {
  }

  constructor(private windowService: WindowService) {
  }

  ngOnInit() {
    this._show = true;
  }

  openWindow(template: TemplateRef<any>, titleBar: TemplateRef<any>) {
    if (this.modal) {
      this.showModal = true;
    }
    if (this.positionCenter) {
      const layoutWith = window.innerWidth;
      const layoutHeight = window.innerHeight;
      this.top = (layoutHeight - this.height) / 4;
      this.left = (layoutWith - this.width) / 2;
    }
    this.windowRef = this.windowService.open({
      titleBarContent: titleBar,
      content: template,
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left,
      draggable: this.draggable,
      resizable: this.resizable,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      autoFocusedElement: this.autoFocusedElement,
      keepContent: this.keepContent
    });

    this.windowRef.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        this.showModal = false;
        this.close.emit();
        this.onChangeCallback(false);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  writeValue(obj: any): void {
    if (obj !== null || obj !== undefined) {
      if (obj === true) {
        this._show = true;
        this.openWindow(this.windowArea, this.windowTitleBar);
      } else {
        if (this.windowRef !== null && this.windowRef !== undefined) {
          this._show = true;
          this.windowRef.close();
        }
      }
    }
  }

  setDisabledState(isDisabled: boolean): void {
  }

}
