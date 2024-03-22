import {GenreModel} from "./genre.model";
import {AuthorModel} from "./author.model";

export class BookModel {
  id?: number;
  title?: string;
  genre?: GenreModel;
  authors?: AuthorModel[];
}
