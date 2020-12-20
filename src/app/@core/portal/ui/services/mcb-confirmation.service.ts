import { EventEmitter, Injectable, Output, Injector } from '@angular/core';
import { ConfirmationDto } from './types';

@Injectable({
  providedIn: 'root'
})
export class McbConfirmationService {
  // tslint:disable-next-line: variable-name
  @Output() _open: EventEmitter<ConfirmationDto> = new EventEmitter<ConfirmationDto>();

  constructor() {
  }

  confirm(data: ConfirmationDto) {
    // const translator = this.injector.get(TranslatorService);

    // if (data.titleKey) {
    //   data.title = translator.translate(data.titleKey);
    // }

    // if (data.messageKey) {
    //   data.message = translator.translate(data.messageKey);
    // }

    this._open.emit(data);
  }
}
