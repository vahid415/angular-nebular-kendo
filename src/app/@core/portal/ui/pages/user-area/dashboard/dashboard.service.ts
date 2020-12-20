import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private baseUrl = 'edge-server/security';

    constructor(private http: HttpClient) {
    }

    getTasks() {
        // return this.http.get(this.baseUrl + 'getTasks');
        const tasks = [];
        // for (let i = 0; i < 5; i++) {
        //     const t = new Task();
        //     t.id = i;
        //     t.workflowId = 1;
        //     t.stateId = (i % 3) + 1;
        //     t.workflowTitle = 'task 1';
        //     t.workflowInstanceId = i.toString();
        //     t.stateTitle = 'state ' + t.stateId;
        //     t.createDate = '2020-01-22';
        //     t.referrerTitle = 'referrer 1';
        //     t.transitions = [
        //         new Transition(1, 'تایید'),
        //         new Transition(2, 'رد درخواست'),
        //         new Transition(3, 'ارجاع جهت بازنگری'),
        //     ];
        //     tasks.push(t);
        // }

        return of(tasks);
    }
}
