import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LookupService {
    constructor(private http: HttpClient) {
    }

    findDataById(url: string, id: string): Observable<any> {
        let value;
        const parsedId = Number(id);
        if (!isNaN(parsedId) && !id.startsWith('0')) {
            value = parsedId;
        } else {
            value = id;
        }
        return this.http.post<any>(url, value);
    }
}
