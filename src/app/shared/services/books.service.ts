import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdminBaseServiceService} from "./admin-base-service.service";
import {BookModel} from "../models/book.model";

@Injectable({
  providedIn: 'root'
})
export class BooksService extends AdminBaseServiceService {
  private _baseUrl = environment.BooksService;
  constructor(http: HttpClient) {
    super(http);
  }

  getBooks() {
    return this.http.get(this._baseUrl, this.header);
  }
  createBook(book: BookModel) {
    const bookDto = {
      title: book.title,
      genreId: book.genre.id,
      authorIds: book.authors.map(x => x.id)
    }
    return this.http.post(this._baseUrl + 'create', bookDto, this.header);
  }
  updateBook(book: BookModel) {
    const bookDto = {
      bookId: book.id,
      title: book.title,
      genreId: book.genre.id,
      authorIds: book.authors.map(x => x.id)
    }
    return this.http.post(this._baseUrl + 'update', bookDto, this.header);
  }
  deleteBook(id: number) {
    return this.http.delete(this._baseUrl + id, this.header);
  }
}
