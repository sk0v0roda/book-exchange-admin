import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdminBaseServiceService} from "./admin-base-service.service";
import {GenreModel} from "../models/genre.model";

@Injectable({
  providedIn: 'root'
})
export class GenresService extends AdminBaseServiceService {
  private _baseUrl = environment.GenresService;
  constructor(http: HttpClient) {
    super(http);
  }

  getGenres() {
    return this.http.get(this._baseUrl, this.header);
  }
  createGenre(genre: GenreModel) {
    return this.http.post(this._baseUrl + 'create', {name: genre.name }, this.header);
  }
  updateGenre(genre: GenreModel) {
    return this.http.post(this._baseUrl + 'update', genre, this.header);
  }
  deleteGenre(id: number) {
    return this.http.delete(this._baseUrl + id, this.header);
  }
}
