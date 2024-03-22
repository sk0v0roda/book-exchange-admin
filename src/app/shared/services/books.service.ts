import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdminBaseServiceService} from "./admin-base-service.service";

@Injectable({
  providedIn: 'root'
})
export class BooksService extends AdminBaseServiceService {
  private _baseUrl = environment.BooksService;
  constructor(http: HttpClient) {
    super(http);
  }

  getBooks() {
    /*return this.http.get(this._baseUrl, this.header).subscribe();*/
    return [
      {
        "id": 1,
        "title": "Мастер и Маргарита",
        "genre": {
          "id": 1,
          "name": "Роман"
        },
        "authors": [
          {
            "id": 1,
            "name": "Михаил Булгаков"
          }
        ]
      }
    ]
  }
}
