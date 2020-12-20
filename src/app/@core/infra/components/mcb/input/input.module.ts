import { LocalizationModule } from './../../../../infra/shared/localization/localization.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input.component';
import {FormsModule} from '@angular/forms';
import {InputService} from './input.service';
import {McbWindowModule} from "../window/window.module";
import {WindowModule} from "@progress/kendo-angular-dialog";

@NgModule({
  declarations: [InputComponent],
    imports: [
        CommonModule,
        FormsModule,
        LocalizationModule,
        McbWindowModule,
        WindowModule
    ],
  exports: [InputComponent],
  providers: [InputService]
})
export class InputModule {
}
