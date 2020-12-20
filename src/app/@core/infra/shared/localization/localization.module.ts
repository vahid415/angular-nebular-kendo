import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatorPipe } from './lang/translator.pipe';
import { McbJalaliDatePipe } from './date/jalali-date.pipe';
import { MessageService } from '@progress/kendo-angular-l10n';
import { KendoMessageService } from './lang/kendo-message.service';

@NgModule({
  declarations: [
    McbJalaliDatePipe,
    TranslatorPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'fa-IR' },
    { provide: MessageService, useClass: KendoMessageService },
  ],
  exports: [
    McbJalaliDatePipe,
    TranslatorPipe
  ]
})
export class LocalizationModule {
}
