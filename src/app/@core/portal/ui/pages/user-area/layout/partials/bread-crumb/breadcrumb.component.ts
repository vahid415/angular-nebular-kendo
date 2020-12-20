import { Component, OnInit } from '@angular/core';
import { ComponentTreeService } from '../../../../../../routing/component-tree-service';
import { BREADCRUMB_SYMBOL, BreadcrumbItem, BreadcrumbItems } from '../../../../../../decorators/types';
import { Router } from '@angular/router';
import { TranslatorService } from '../../../../../../../infra/shared/localization/lang/translator.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-portal-user-area-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class PortalUserAreaBreadcrumbComponent {
  breadcrumbItemTextSymbol = Symbol('breadcrumbItemTextSymbol');

  constructor(
    private componentTreeService: ComponentTreeService,
    private router: Router,
    private translatorService: TranslatorService,
    private title: Title,

  ) {
    componentTreeService.change.subscribe(components => {
      this.setBrowserTitle();
    });
  }

  getBreadcrumbItems() {
    const result: BreadcrumbItem[] = [];
    const components = this.componentTreeService.tree;
    const translator = this.findTranslator(components) ?? this.translatorService;
    const translateItem = (item) => {
      item[this.breadcrumbItemTextSymbol] = item.text ? item.text : translator.translate(item.textKey);
    };

    components.filter(c => c[BREADCRUMB_SYMBOL] != null)
      .forEach(c => {
        let items: BreadcrumbItem | BreadcrumbItems = c[c[BREADCRUMB_SYMBOL]];
        items = Array.isArray(items) ? items : [items];
        items.forEach(i => {
          translateItem(i);
          result.push(i);
        });
      });

    return result.filter(i => i.show !== false);
  }

  private findTranslator(components: any[]) {
    for (let i = components.length - 1; i >= 0; i--) {
      const component = components[i];
      for (const prop in component) {
        if (Object.prototype.hasOwnProperty.call(component, prop)) {
          const propValue = component[prop];
          if (propValue instanceof TranslatorService) {
            return propValue;
          }
        }
      }
    }
  }

  private setBrowserTitle() {
    const items = this.getBreadcrumbItems();
    if (items.length > 0) {
      const last = items[items.length - 1];
      this.title.setTitle(`${last[this.breadcrumbItemTextSymbol]} - ${this.translatorService.translate('mcb')}`);
    }
  }

  onItemClick(item: BreadcrumbItem) {
    this.router.navigate(item.path, { relativeTo: item.relativeTo });
  }
}
