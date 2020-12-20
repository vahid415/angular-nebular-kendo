import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpOptions, ServiceHostToken, TemporaryHttpHeaderKeys } from './types';
import { ToastService } from '../ui/services/toast.service';
import { Injector } from '@angular/core';

export class McbHttpClient {
    private http: HttpClient;
    private toast: ToastService;

    constructor(
        private basePath: string,
        private injector: Injector,
    ) {
        this.http = injector.get(HttpClient);
        this.toast = injector.get(ToastService);
        let serviceHost = injector.get<string>(ServiceHostToken, '');

        if (typeof this.basePath !== 'string') {
            throw Error('invalid base url.');
        }

        if (serviceHost !== '' && !serviceHost.endsWith('/')) {
            serviceHost += '/';
        }

        if (this.basePath.startsWith('/')) {
            this.basePath = this.basePath.substring(1);
        }

        if (!this.basePath.endsWith('/')) {
            this.basePath += '/';
        }

        this.basePath = serviceHost + this.basePath;
    }

    get<T>(url: string, options?: HttpOptions): Observable<T> {
        const URL = this.makeUrl(url, options);
        const OPTIONS = this.makeHttpClientOptions(options);
        return this.mapResponse(this.http.get<T>(URL, OPTIONS));
    }

    post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
        const URL = this.makeUrl(url, options);
        const BODY = this.makeBody(body, options);
        const OPTIONS = this.makeHttpClientOptions(options);
        return this.mapResponse(this.http.post(URL, BODY, OPTIONS));
    }

    put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
        const URL = this.makeUrl(url, options);
        const BODY = this.makeBody(body, options);
        const OPTIONS = this.makeHttpClientOptions(options);
        return this.mapResponse(this.http.put(URL, BODY, OPTIONS));
    }

    delete<T>(url: string, options?: HttpOptions): Observable<T> {
        const URL = this.makeUrl(url, options);
        const OPTIONS = this.makeHttpClientOptions(options);
        return this.mapResponse(this.http.delete(URL, OPTIONS));
    }

    private makeUrl(url: string, options: HttpOptions) {
        return (options && options.pathType && options.pathType === 'absolute') ? url : (this.basePath + url);
    }

    private makeHttpClientOptions(options?: HttpOptions) {
        if (!options) {
            return {};
        }

        const opts: any = {};

        // Query String
        const query = options.query;
        if (typeof query === 'object') {
            let params = new HttpParams();
            for (const key in query) {
                if (query.hasOwnProperty(key)) {
                    const value = query[key];
                    const type = typeof value;
                    if (type === 'string' || type === 'number') {
                        params = params.set(key, value);
                    }
                }
            }
            opts.params = params;
        }

        // Response Type
        if (options.responseType === 'blob') {
            opts.responseType = 'blob';
        }

        // Temporary Headers (will be removed by portal interceptors)
        let headers = new HttpHeaders();
        if (options.displayServerErrors === false) {
            headers = headers.set(TemporaryHttpHeaderKeys.DisplayServerErrors, 'False');
        }
        if (options.goToLoginPageAfterUnauthorizedError === false) {
            headers = headers.set(TemporaryHttpHeaderKeys.AfterUnauthorizedError, 'Nothing');
        }
        opts.headers = headers;

        // Angular http options
        return opts;
    }

    private makeBody(body: any, options: HttpOptions) {
        body = this.processBodyFields(body);
        if (!options || !options.contentType || options.contentType !== 'multipart/form-data') {
            return body;
        }

        // contentType is multipart/form-data
        const formData = new FormData();
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                const field = body[key];
                let value;

                if (typeof field === 'string' || field instanceof File) {
                    value = field;
                } else if (typeof field === 'number') {
                    value = field.toString();
                } else if (typeof field === 'object') {
                    value = JSON.stringify(field);
                }

                if (value) {
                    formData.append(key, value);
                }
            }
        }
        return formData;
    }

    private processBodyFields(body: any) {
        return body;
    }

    private mapResponse<T>(res: Observable<any>) {
        return res;
    }
}
