import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePasswordDto } from './type';


const BASE_URL = 'api/infrastructure-security/';
@Injectable({
  providedIn: 'root'
})
export class PortalUserChangePasswordService {
  constructor(public http: HttpClient
  ) { }

  changePassword(model: ChangePasswordDto) {
    return this.http.post<number>(`${BASE_URL}users/change-password`, model);
  }
}
