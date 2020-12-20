import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from '../pipes/image.pipe';
import { McbGridTooltipDirective } from '../directive/grid-tooltip.directive';


const DECLARATIONS = [
  ImagePipe,
  McbGridTooltipDirective
];
@NgModule({
  declarations: DECLARATIONS,

  imports: [
    CommonModule
  ],
  exports: [
    ...DECLARATIONS
  ]
})
export class UtilsModule {
}
