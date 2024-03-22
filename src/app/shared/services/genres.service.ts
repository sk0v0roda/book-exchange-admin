import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdminBaseServiceService} from "./admin-base-service.service";

@Injectable({
  providedIn: 'root'
})
export class GenresService extends AdminBaseServiceService {
  private _baseUrl = environment.GenresService;
  constructor(http: HttpClient) {
    super(http);
  }
}
