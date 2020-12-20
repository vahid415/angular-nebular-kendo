import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  public write(message?: any, ...optionalParams: any[]) {
    console.log('----------- MCB LOG -----------');
    console.log(message, optionalParams);
    console.log('-------- END OF MCB LOG -------');
  }
}
