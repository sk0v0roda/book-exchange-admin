import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AdminBaseServiceService} from "./admin-base-service.service";

@Injectable({
  providedIn: 'root'
})
export class PromoteService extends AdminBaseServiceService {
  private _baseUrl = environment.AuthService;
  constructor(http: HttpClient) {
    super(http);
  }
  public promoteToAdmin(email: string) {
    return this.http.post(this._baseUrl + 'set-admin', {email: email}, this.header);
  }
}
