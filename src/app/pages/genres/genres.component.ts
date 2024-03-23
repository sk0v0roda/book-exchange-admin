import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GenresService} from "../../shared/services";
import {DxButtonModule, DxListComponent, DxListModule} from "devextreme-angular";
import {GenresPopupComponent} from "../genres/genres-popup/genres-popup.component";
import {GenreModel} from "../../shared/models/genre.model";
import {confirm} from "devextreme/ui/dialog";
import notify from "devextreme/ui/notify";

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, DxListModule, GenresPopupComponent, DxButtonModule],
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  @ViewChild(DxListComponent) list?: DxListComponent;
  @ViewChild(GenresPopupComponent) popup?: GenresPopupComponent;
  public dataSource: any;
  public selectedGenre?: GenreModel;
  public isEditDisabled = true;
  constructor(private genresService: GenresService) {
  }
  ngOnInit() {
    this.genresService.getGenres().subscribe((genres: any) => {
      this.dataSource = genres.genres;
    });
  }
  selectionChanged(e: any) {
    this.selectedGenre = this.list?.selectedItems[0];
    this.isEditDisabled = false;
  }
  open(isEdit: boolean) {
    if (isEdit) {
      this.popup?.open(this.list?.selectedItems[0])
    } else {
      this.popup?.open();
    }
  }

  genreSaved() {
    if (!this.popup?.edit) {
      this.dataSource.push(this.popup?.genre);
    }
  }
  deleteGenre() {
    confirm('Вы точно хотите удалить этот жанр?', 'Подтвердите').then(
      (resp) => {
        if (resp) {
          this.genresService.deleteGenre(this.selectedGenre?.id || 0).subscribe((response: any) => {
            notify('Жанр успешно удален', "success", 8000);
            this.dataSource = this.dataSource.filter((x: any) => x.id != this.selectedGenre?.id);
          }, (err) => {
            notify('Произошла ошибка при удалении жанра', "danger", 8000);
          });
        }
      }
    );

  }
}
