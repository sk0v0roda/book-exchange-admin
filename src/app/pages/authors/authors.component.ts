import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DxButtonModule, DxListComponent, DxListModule} from "devextreme-angular";
import {AuthorsService, GenresService} from "../../shared/services";
import {BookModel} from "../../shared/models/book.model";
import {AuthorModel} from "../../shared/models/author.model";
import {confirm} from "devextreme/ui/dialog";
import notify from "devextreme/ui/notify";
import {AuthorsPopupComponent} from "./authors-popup/authors-popup.component";

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, DxListModule, DxButtonModule, AuthorsPopupComponent],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  @ViewChild(DxListComponent) list?: DxListComponent;
  @ViewChild(AuthorsPopupComponent) popup?: AuthorsPopupComponent;
  public dataSource: any;
  public selectedAuthor?: AuthorModel;
  public isEditDisabled = true;
  constructor(private authorsService: AuthorsService) {
  }
  ngOnInit() {
    this.authorsService.getAuthors().subscribe((authors: any) => {
      this.dataSource = authors.authors;
    });
  }
  selectionChanged(e: any) {
    this.selectedAuthor = this.list?.selectedItems[0];
    this.isEditDisabled = false;
  }
  open(isEdit: boolean) {
    if (isEdit) {
      this.popup?.open(this.list?.selectedItems[0])
    } else {
      this.popup?.open();
    }
  }

  authorSaved() {
    if (!this.popup?.edit) {
      this.dataSource.push(this.popup?.author);
    }
  }
  deleteAuthor() {
    confirm('Вы точно хотите удалить этого автора?', 'Подтвердите').then(
      (resp) => {
        if (resp) {
          this.authorsService.deleteAuthor(this.selectedAuthor?.id || 0).subscribe((response: any) => {
            notify('Автор успешно удален', "success", 8000);
            this.dataSource = this.dataSource.filter((x: any) => x.id != this.selectedAuthor?.id);
          }, (err) => {
            notify('Произошла ошибка при удалении автора', "danger", 8000);
          });
        }
      }
    );

  }
}
