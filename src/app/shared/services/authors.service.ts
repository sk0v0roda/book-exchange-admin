import { Injectable } from '@angular/core';
import {AdminBaseServiceService} from "./admin-base-service.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends AdminBaseServiceService {
  private _baseUrl = environment.AuthorsService;
  constructor(http: HttpClient) {
    super(http);
  }
}
