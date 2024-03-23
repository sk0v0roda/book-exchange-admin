import {GenreModel} from "./genre.model";
import {AuthorModel} from "./author.model";

export class BookModel {
  id?: number;
  title = '';
  genre = new GenreModel();
  authors: AuthorModel[] = [];

}
