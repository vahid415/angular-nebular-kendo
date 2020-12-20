import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dictionary } from '../../types';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  sharedDict: Subject<Dictionary> = new Subject();
  constructor() {
  }

}