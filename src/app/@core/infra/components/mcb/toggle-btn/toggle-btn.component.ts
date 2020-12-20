import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle-btn.component.html'
})
export class ToggleBtnComponent implements OnChanges {
  value = true;
  @Input() checked = true;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Input() disabled = false;
  @Input() tips: [string, string] = ['فعالسازی', 'غیرفعالسازی'];
  @Input() shape: 'round' = 'round';

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.checked) {
      this.value = this.checked;
    }
  }

  onChange($event): void {
    this.checkedChange.emit(this.value = Boolean($event.target?.checked));
  }
}
