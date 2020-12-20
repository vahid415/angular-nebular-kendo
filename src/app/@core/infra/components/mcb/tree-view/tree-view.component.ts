import { Component, OnInit, Input, Optional, ViewChild, ContentChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';

export type TreeViewLoadFunc = (parent: any, filter: string) => any[] | Observable<any[]>;
export interface ContextMenuItemSelectData {
    node: any;
    menuItem: any;
}

@Component({
    selector: 'app-treeview',
    exportAs: 'mcbTreeview',
    templateUrl: './tree-view.component.html',
    styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
        this.reload();
    }

    //
    // ----------- Data Binding Functionality
    //
    private _loadFunc: TreeViewLoadFunc;
    private _cache = new Map<any, any>();
    /** private */
    _firstLevelNodes: any[];

    /**  determines whether caching mechanism is enabled or not */
    @Input() cacheNodes = true;

    /**  The fields of the data item that provide the text content of the nodes */
    @Input() textField: string;

    /** A function which determines if a node has any children */
    @Input() hasChildrenFunc: <T>(item: T) => boolean;

    /** A function which provides nodes */
    @Input() set loadFunc(value: TreeViewLoadFunc) {
        const valueType = typeof value;
        if (!(value === null || value === undefined || valueType === 'function')) {
            throw Error('invalid loadChildrenFunc function');
        }
        this._loadFunc = value;
    }

    get loadFunc() {
        return this._loadFunc;
    }

    /** Reloads the treeview (calls loadFunc() function again to load first level items) */
    reload() {
        this._cache.clear();
        this._firstLevelNodes = [];
        if (this._loadFunc) {
            this._childrenFunc(null).subscribe(nodes => {
                this._firstLevelNodes = nodes;
            });
        }
    }

    /** private */
    _childrenFunc = (item) => {
        if (this.cacheNodes && item && this._cache.has(item)) {
            // try to find children in cache
            return of(this._cache.get(item));
        } else if (this._loadFunc) {
            const loadFuncResult = this.loadFunc(item, '');
            if (Array.isArray(loadFuncResult)) {
                this._cache.set(item, loadFuncResult);
                return of(loadFuncResult);
            } else if (loadFuncResult instanceof Observable) {
                return loadFuncResult.pipe(
                    tap(x => {
                        if (this.cacheNodes) {
                            this._cache.set(item, x);
                        }
                    })
                );
            }
            throw Error('invalid result from loadChildrenFunc()');
        } else {
            return of([]);
        }
    }


    //
    // ----------- Filtering Functionality
    //
    @Input() filterable = false;
    @Input() filter: string;
    @Input() filterPlaceholder: string;
    @Output() filterChange = new EventEmitter<string>();

    /** clears the filter */
    clearFilter() {
        this.filter = null;
        this.filterChange.emit(null);
    }

    //
    // ----------- ContextMenu Functionality
    //

    /** private */
    @ViewChild('contextMenu') _contextMenu: ContextMenuComponent;
    private _rightClickedItem: any;

    /** context menu items */
    @Input() contextMenuItems: { text: string, icon?: string, data?: any }[];

    /** Fires when the user selects a context menu item */
    @Output() contextMenuItemSelect = new EventEmitter<ContextMenuItemSelectData>();

    /** private */
    _onNodeClick(e) {
        this.nodeClick.emit(e);
        const item = e.item.dataItem;

        // if (e.type === 'click') {
        // }

        if (e.type === 'contextmenu') {
            this._rightClickedItem = item;
            const oe = e.originalEvent;
            oe.preventDefault();
            this._contextMenu.show({ left: oe.pageX, top: oe.pageY });
        }
    }

    /** private */
    _onMenuItemSelect({ item }) {
        this.contextMenuItemSelect.emit({ menuItem: item, node: this._rightClickedItem });
    }

    //
    // ----------- Disable Functionality
    //

    /** A function which determines if a specific node is disabled or not */
    @Input() isNodeDisabledFunc: any;


    //
    // ----------- Selection Functionality
    //

    /** Determines if selection functionality is enabled or not */
    @Input() selectable: boolean | {
        enabled?: boolean,
        mode?: 'single' | 'multiple'
    };

    /** Fires when selected item changes. */
    @Output() selectionChange = new EventEmitter<any>();

    /** Fires when a node is clicked by user */
    @Output() nodeClick = new EventEmitter<any>();

    //
    // ----------- Checkable Functionality
    //

    /** Determines if 'checkable' functionality is enabled or not */
    @Input() checkable: boolean | {
        enabled?: boolean,
        mode?: 'single' | 'multiple',
        checkChildren?: boolean,
        checkParents?: boolean,
        checkOnClick?: boolean
    };
}
