import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorModel} from "../../../shared/models/author.model";
import {AuthorsService} from "../../../shared/services";
import notify from "devextreme/ui/notify";
import {DxButtonModule, DxFormModule, DxPopupModule} from "devextreme-angular";
import {DxiItemModule} from "devextreme-angular/ui/nested";

@Component({
  selector: 'app-authors-popup',
  standalone: true,
  imports: [CommonModule, DxPopupModule, DxFormModule, DxiItemModule, DxButtonModule],
  templateUrl: './authors-popup.component.html',
  styleUrls: ['./authors-popup.component.scss']
})
export class AuthorsPopupComponent {
  @Output() onDone = new EventEmitter();
  public isVisible = false;
  public author: AuthorModel = new AuthorModel();
  public edit = false;

  constructor(private authorsService: AuthorsService) {
  }
  open(author: any = null) {
    if (author) {
      this.author = author;
      this.edit = true;
    } else {
      this.author = new AuthorModel();
    }
    this.isVisible = true;
  }

  done() {
    if (!this.edit) {
      this.authorsService.createAuthor(this.author).subscribe((id: any) => {
        this.author.id = id.id;
        notify('Автор успешно сохранен', "success", 8000);
        this.onDone.emit();
        this.isVisible = false;
      }, (err) => {
        notify('Произошла ошибка при сохранении', "error", 8000);
      });
    } else {
      this.authorsService.updateAuthor(this.author).subscribe((id: any) => {
        this.author.id = id.id;
        notify('Автор успешно сохранен', "success", 8000);
        this.onDone.emit();
        this.isVisible = false;
      }, (err) => {
        notify('Произошла ошибка при сохранении', "error", 8000);
      });
    }
  }

}
