import { Injectable } from '@angular/core';
import {AdminBaseServiceService} from "./admin-base-service.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthorModel} from "../models/author.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends AdminBaseServiceService {
  private _baseUrl = environment.AuthorsService;
  constructor(http: HttpClient) {
    super(http);
  }
  getAuthors() {
    return this.http.get(this._baseUrl, this.header);
  }

  createAuthor(author: AuthorModel) {
    return this.http.post(this._baseUrl + 'create', {name: author.name }, this.header);
  }
  updateAuthor(author: AuthorModel) {
    const authorDto = {
      id: author.id,
      newName: author.name
    }
    return this.http.post(this._baseUrl + 'update', authorDto, this.header);
  }
  deleteAuthor(id: number) {
    return this.http.delete(this._baseUrl + id, this.header);
  }
}
