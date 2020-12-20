import { InjectionToken } from '@angular/core';

export type Locale = 'faIR' | 'enUS';
export interface Dictionary {
  locale: Locale;
  entries: { [key: string]: string };
}

export interface McbDateDescriptor {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
}

export type McbDateFormat = 'YYYY-MM-DD' | 'YYYY-M-D' | 'YYYY/M/DD' | 'YYYY/MM/D'
  | 'YYYY/MM/DD' | 'YYYY/M/D' | 'HH:mm' | 'HH:mm:ss' | string;
export type McbDateManipulationUnit = 'days' | 'months' | 'years' | 'hours' | 'minutes' | 'seconds';
export type McbCalendarType = 'jalali' | 'gregorian';

export interface McbDateParseOptions {
  // dateSeperator: string;
}

export interface McbDateFormatOptions {
  // dateSeperator: string;
}
