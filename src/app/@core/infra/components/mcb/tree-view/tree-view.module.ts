import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view.component';
import { TreeViewModule as KendoTreeViewModule } from '@progress/kendo-angular-treeview';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from '@progress/kendo-angular-menu';

@NgModule({
  declarations: [
    TreeViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    KendoTreeViewModule,
    ContextMenuModule
  ],
  exports: [
    TreeViewComponent
  ]
})
export class TreeViewModule { }
