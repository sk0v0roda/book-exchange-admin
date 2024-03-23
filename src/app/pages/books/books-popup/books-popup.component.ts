import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevExtremeModule, DxFormComponent} from "devextreme-angular";
import {AuthorsService, BooksService, GenresService} from "../../../shared/services";
import {BookModel} from "../../../shared/models/book.model";
import notify from "devextreme/ui/notify";
import {AuthorModel} from "../../../shared/models/author.model";

@Component({
  selector: 'app-books-popup',
  standalone: true,
  imports: [CommonModule, DevExtremeModule],
  templateUrl: './books-popup.component.html',
  styleUrls: ['./books-popup.component.scss']
})
export class BooksPopupComponent implements OnInit {
  @Output() onDone = new EventEmitter();
  public isVisible = false;
  public book: BookModel = new BookModel();
  public edit = false;
  public genres: any;
  public authors: any;

  constructor(private genresService: GenresService,
              private authorsService: AuthorsService,
              private booksService: BooksService) {
  }

  ngOnInit() {
    this.genresService.getGenres().subscribe((genres: any) => {
      this.genres = genres.genres
    });
    this.authorsService.getAuthors().subscribe((authors: any) => {
      this.authors = authors.authors
    });
  }

  open(book: any = null) {
    if (book) {
      this.book = book;
      this.edit = true;
    } else {
      this.book = new BookModel();
    }
    this.isVisible = true;
  }

  done() {
    if (!this.edit) {
      this.booksService.createBook(this.book).subscribe((id: any) => {
        this.book.id = id.id;
        notify('Книга успешно сохранена', "success", 8000);
        this.onDone.emit();
        this.isVisible = false;
      }, (err) => {
        notify('Произошла ошибка при сохранении', "error", 8000);
      });
    } else {
      this.booksService.updateBook(this.book).subscribe((id: any) => {
        this.book.id = id.id;
        notify('Книга успешно сохранена', "success", 8000);
        this.onDone.emit();
        this.isVisible = false;
      }, (err) => {
        notify('Произошла ошибка при сохранении', "error", 8000);
      });
    }
  }

}
