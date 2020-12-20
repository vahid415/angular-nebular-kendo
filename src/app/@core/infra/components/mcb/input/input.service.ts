import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class InputService {
  constructor(private http: HttpClient) {
  }

  findByValue(url: string, value: number | string): Observable<any> {
    return this.http.post<any>(url, value);
  }
}
