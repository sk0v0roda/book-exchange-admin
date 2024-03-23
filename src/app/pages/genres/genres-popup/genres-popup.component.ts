import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GenreModel} from "../../../shared/models/genre.model";
import {GenresService} from "../../../shared/services";
import notify from "devextreme/ui/notify";
import {DevExtremeModule} from "devextreme-angular";
import {AuthorModel} from "../../../shared/models/author.model";

@Component({
  selector: 'app-genres-popup',
  standalone: true,
  imports: [CommonModule, DevExtremeModule],
  templateUrl: './genres-popup.component.html',
  styleUrls: ['./genres-popup.component.scss']
})
export class GenresPopupComponent {
  @Output() onDone = new EventEmitter();
  public isVisible = false;
  public genre: GenreModel = new GenreModel();
  public edit = false;

  constructor(private genresService: GenresService) {
  }
  open(genre: any = null) {
    if (genre) {
      this.genre = genre;
      this.edit = true;
    } else {
      this.genre = new GenreModel();
    }
    this.isVisible = true;
  }

  done() {
    if (!this.edit) {
      this.genresService.createGenre(this.genre).subscribe((id: any) => {
        this.genre.id = id.id;
        notify('Жанр успешно сохранен', "success", 8000);
        this.onDone.emit();
        this.isVisible = false;
      }, (err) => {
        notify('Произошла ошибка при сохранении', "error", 8000);
      });
    } else {
      this.genresService.updateGenre(this.genre).subscribe((id: any) => {
        this.genre.id = id.id;
        notify('Жанр успешно сохранен', "success", 8000);
        this.onDone.emit();
        this.isVisible = false;
      }, (err) => {
        notify('Произошла ошибка при сохранении', "error", 8000);
      });
    }
  }

}
