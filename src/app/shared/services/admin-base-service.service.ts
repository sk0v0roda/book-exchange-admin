import {Inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminBaseServiceService {
  public header: any;
  constructor(public http: HttpClient) {
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('accessToken')}`)
    };
  }
}
