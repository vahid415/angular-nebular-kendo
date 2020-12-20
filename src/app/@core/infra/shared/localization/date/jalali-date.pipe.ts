import { Pipe, PipeTransform } from '@angular/core';
import { McbDate } from './date';

@Pipe({ name: 'mcbJalaliDate' })
export class McbJalaliDatePipe implements PipeTransform {
    constructor() { }

    transform(value: string): string {
        if (!value) {
            return '';
        }

        try {
            return McbDate.parseGregorian(value,"YYYY/MM/DD").formatJalaali('YYYY/MM/DD');
        } catch {
            return 'invalid-date';
        }
    }
}
