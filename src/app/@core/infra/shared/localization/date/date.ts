import * as momentNS from 'moment-jalaali';

const moment = momentNS;
import {Observable} from 'rxjs';
import {McbDateDescriptor, McbDateFormat, McbDateManipulationUnit, McbDateFormatOptions} from '../types';

export const jalaaliMonths = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export class McbDate {
  private date: momentNS.Moment;

  private constructor(date: momentNS.Moment) {
    this.date = date;
  }

  private static resetTime(m: momentNS.Moment) {
    return m.hour(0).minute(0).second(0);
  }

  /**
   * Returns the current client date
   */
  static clientDate(includeTime = true) {
    let m = moment();
    if (!includeTime) {
      m = this.resetTime(m);
    }
    return new McbDate(m);
  }

  /**
   * Returns the current server date
   */
  static serverDate(): Observable<McbDate> {
    throw new Error('not implemented.');
  }

  /**
   * Creates a McbDate instance from the given Jalaali date
   */
  static fromJalaali(date: McbDateDescriptor) {
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'jYYYY-jMM-jDD');
    return new McbDate(m);
  }

  /**
   * Creates a McbDate instance from the given Gregorian date
   */
  static fromGregorian(date: McbDateDescriptor): McbDate {
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-M-D');
    return new McbDate(m);
  }

  /**
   * Parse a string as a Jalaali date and returns its equivalent McbDate
   */
  static parseJalaali(date: string, format: McbDateFormat): McbDate {
    let momentFormat: string;
    switch (format) {
      case 'YYYY-MM-DD':
        momentFormat = `jYYYY-jMM-jDD`;
        break;
      case 'YYYY-M-D':
        momentFormat = `jYYYY-jM-jD`;
        break;
      case 'YYYY/M/D':
        momentFormat = 'jYYYY/jM/jD';
        break;
      case 'YYYY/MM/D':
        momentFormat = 'jYYYY/jMM/jD';
        break;
      case 'YYYY/M/DD':
        momentFormat = 'jYYYY/jM/jDD';
        break;
      case 'YYYY/MM/DD':
        momentFormat = 'jYYYY/jMM/jDD';
        break;
      default:
        throw new Error('unknown date format');
    }

    return new McbDate(moment(date, momentFormat, true));
  }

  /**
   * Parse a string as a Gregorian date and returns its equivalent McbDate
   */
  static parseGregorian(date: string, format: McbDateFormat): McbDate {
    let momentFormat: string;
    switch (format) {
      case 'YYYY-M-D':
        momentFormat = `YYYY-M-D`;
        break;
      case 'YYYY-M-DD':
        momentFormat = `YYYY-M-DD`;
        break;
      case 'YYYY-MM-D':
        momentFormat = `YYYY-MM-D`;
        break;
      case 'YYYY-MM-DD':
        momentFormat = `YYYY-MM-DD`;
        break;
      case 'YYYY/M/D':
        momentFormat = 'YYYY/M/D';
        break;
      case 'YYYY/M/DD':
        momentFormat = 'YYYY/M/DD';
        break;
      case 'YYYY/MM/D':
        momentFormat = 'YYYY/MM/D';
        break;
      case 'YYYY/MM/DD':
        momentFormat = 'YYYY/MM/DD';
        break;
      default:
        throw new Error('unknown date format');
    }

    return new McbDate(moment(date, momentFormat, false));
  }

  /**
   * Parse a string as a MCB Server date and returns its equivalent McbDate
   */
  static parseServer(date: string): McbDate {
    return McbDate.parseGregorian(date, 'YYYY-MM-DD');
  }

  /**
   * Creates an invalid date
   */
  static invalid(): McbDate {
    return new McbDate(moment.invalid());
  }

  /**
   * Determines if this instance is a valid date
   */
  isValid(): boolean {
    const tt = this.date.isValid();
    return tt
  }

  /**
   * Adds a specefic amount of time to the current McbDate
   */
  add(amount: number, unit: McbDateManipulationUnit): McbDate {
    this.date.add(amount, unit);
    return this;
  }

  /**
   * Subtracts a specefic amount of time from the current McbDate
   */
  subtract(amount: number, unit: McbDateManipulationUnit) {
    this.date.subtract(amount, unit);
    return this;
  }

  /**
   * Checks if this McbDate is before another McbDate
   */
  isBefore(date: McbDate): boolean {
    return this.date.isBefore(date.date, 'second');
  }

  /**
   * Checks if this McbDate is after another McbDate
   */
  isAfter(date: McbDate): boolean {
    return this.date.isAfter(date.date, 'second');
  }

  /**
   * Checks if this McbDate is same or after another McbDate
   */
  isSameOrAfter(date: McbDate): boolean {
    return this.date.isSameOrAfter(date.date, 'second');
  }

  /**
   * Checks if this McbDate is before another McbDate
   */
  isSameOrBefore(date: McbDate): boolean {
    return this.date.isSameOrBefore(date.date, 'second');
  }

  /**
   * Returns Jalaali date equivalent to this McbDate instance
   */
  toJalaali(): any {
    return {
      year: this.date.jYear(),
      month: this.date.jMonth() + 1,
      day: this.date.jDate(),
      hour: this.date.hour(),
      minute: this.date.minute(),
      second: this.date.second(),
      daysInMonth: this.date.daysInMonth(),
      monthTitle: jalaaliMonths[this.date.jMonth()]
    };
  }

  /**
   * Returns Gregorian date equivalent to this McbDate instance
   */
  toGregorian(): McbDateDescriptor {
    return {
      year: this.date.year(),
      month: this.date.month() + 1,
      day: this.date.date(),
      hour: this.date.hour(),
      minute: this.date.minute(),
      second: this.date.second()
    };
  }

  /**
   * Converts this McbDate instance to a Jalaali date string
   */
  formatJalaali(format: McbDateFormat = 'YYYY/MM/DD', options?: McbDateFormatOptions): string {
    let mFormat: string;
    switch (format) {
      case 'YYYY-MM-DD':
        mFormat = `jYYYY-jMM-jDD`;
        break;
      case 'YYYY-M-D':
        mFormat = `jYYYY-jM-jD`;
        break;
      case 'YYYY/MM/DD':
        mFormat = 'jYYYY/jMM/jDD';
        break;
      case 'YYYY/M/DD':
        mFormat = 'jYYYY/jM/jDD';
        break;
      case 'YYYY/MM/D':
        mFormat = 'jYYYY/jMM/jD';
        break;
      case 'YYYY/M/D':
        mFormat = 'jYYYY/jM/jD';
        break;
      case 'HH:mm:ss':
        mFormat = `HH:mm:ss`;
        break;
      case 'HH:mm':
        mFormat = `HH:mm`;
        break;
      default:
        throw new Error('unknown date format');
    }

    return this.date.format(mFormat);
  }

  /**
   * Converts this McbDate instance to a Gregorian date string
   */
  formatGregorian(format: McbDateFormat = 'YYYY/MM/DD', options?: McbDateFormatOptions): string {
    let mFormat: string;
    switch (format) {
      case 'YYYY-MM-DD':
        mFormat = `YYYY-MM-DD`;
        break;
      case 'YYYY-M-D':
        mFormat = `YYYY-M-D`;
        break;
      case 'YYYY/MM/DD':
        mFormat = 'YYYY/MM/DD';
        break;
      case 'YYYY/M/DD':
        mFormat = 'YYYY/M/DD';
        break;
      case 'YYYY/MM/D':
        mFormat = 'YYYY/MM/D';
        break;
      case 'YYYY/M/D':
        mFormat = 'YYYY/M/D';
        break;
      case 'HH:mm:ss':
        mFormat = `HH:mm:ss`;
        break;
      case 'HH:mm':
        mFormat = `HH:mm`;
        break;
      default:
        throw new Error('unknown date format');
    }

    return this.date.format(mFormat);
  }

  /**
   * Converts this McbDate instance to a MCB server recognizable date string
   */
  formatServer(): string {
    return this.formatGregorian('YYYY-MM-DD');
  }
}
