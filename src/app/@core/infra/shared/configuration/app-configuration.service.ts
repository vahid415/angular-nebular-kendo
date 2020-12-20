import { Injectable } from '@angular/core';
import { Locale } from '../localization/types';

@Injectable({
    providedIn: 'root'
})
export class AppConfigurationService {
    private locale: Locale = 'faIR';

    setLocale(locale: Locale) {
        this.locale = locale;
    }

    getLocale() {
        return this.locale;
    }
}
