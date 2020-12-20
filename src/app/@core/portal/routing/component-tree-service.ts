import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentTreeService {
  private treeValue = [];
  private changeSubject = new Subject<any[]>();
  change = this.changeSubject.asObservable();

  push(component) {
    this.treeValue.push(component);
    this.changeSubject.next(this.treeValue);
  }

  pop() {
    this.treeValue.pop();
    this.changeSubject.next(this.treeValue);
  }

  get tree() {
    return this.treeValue;
  }
}
