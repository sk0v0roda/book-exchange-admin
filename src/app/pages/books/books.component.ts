import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksService} from "../../shared/services";
import {BookModel} from "../../shared/models/book.model";
import {DxButtonModule, DxListComponent, DxListModule} from "devextreme-angular";
import {BooksPopupComponent} from "./books-popup/books-popup.component";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog"

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, DxListModule, DxButtonModule, BooksPopupComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  @ViewChild(BooksPopupComponent) booksPopup?: BooksPopupComponent;
  @ViewChild(DxListComponent) list?: DxListComponent;
  public dataSource: any;
  public selectedBook?: BookModel;
  public isEditDisabled = true;

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.booksService.getBooks().subscribe((books: any) => {
      this.dataSource = books.books;
    });
  }

  // @ts-ignore
  nameDisplayExpr = (data) => {
    return data ? data.title + ', автор: ' + data.authors.map((x: any) => x.name).join(' ') + ', жанр: ' + data.genre.name : null;
  }

  open(isEdit: boolean) {
    if (isEdit) {
      this.booksPopup?.open(this.list?.selectedItems[0])
    } else {
      this.booksPopup?.open();
    }
  }

  bookSaved() {
    if (!this.booksPopup?.edit) {
      this.dataSource.push(this.booksPopup?.book);
    }
  }

  deleteBook() {
    confirm('Вы точно хотите удалить эту книгу?', 'Подтвердите').then(
      (resp) => {
        if (resp) {
          this.booksService.deleteBook(this.selectedBook?.id || 0).subscribe((response: any) => {
            notify('Книга успешно удалена', "success", 8000);
            this.dataSource = this.dataSource.filter((x: any) => x.id != this.selectedBook?.id);
          }, (err) => {
            notify('Произошла ошибка при удалении книги', "danger", 8000);
          });
        }
      }
    );

  }

  selectionChanged(e: any) {
    this.selectedBook = this.list?.selectedItems[0];
    this.isEditDisabled = false;
  }
}
