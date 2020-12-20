import { Injectable, Injector } from '@angular/core';
import { McbHttpClient } from '../../../../../portal/http/http-client';

@Injectable({
  providedIn: 'root'
})
export class InfraHttp extends McbHttpClient {
  constructor(injector: Injector) {
    super('api/', injector);
  }
}
