import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import DevExpress from "devextreme";
import {DxButtonModule, DxFormModule, DxPopupModule, DxSelectBoxModule} from "devextreme-angular";
import {OfferModel} from "../../../shared/models/offer.model";
import {confirm} from "devextreme/ui/dialog"
import {BooksService} from "../../../shared/services";
import {BookModel} from "../../../shared/models/book.model";

@Component({
  selector: 'app-offer-popup',
  standalone: true,
  imports: [CommonModule, DxPopupModule, DxFormModule, NgOptimizedImage, DxButtonModule, DxSelectBoxModule],
  templateUrl: './offer-popup.component.html',
  styleUrls: ['./offer-popup.component.scss']
})
export class OfferPopupComponent implements OnInit {
  public isVisible = false;
  public books: BookModel[] = [];
  public offer: OfferModel;
  public rejectMessage = "";

  constructor(private booksService: BooksService) {
    this.offer = {};
  }

  ngOnInit() {
    this.books = this.booksService.getBooks();
    console.log(this.books);
  }

  public open(offer: OfferModel) {
    this.isVisible = true;
    this.offer = offer;
  }

  public log(e: any) {
    console.log(e);
  }

  public approve() {
    let result = false;
    confirm("<p>Вы уверены?</p>", "Подтвердите").then(x => {
      result = x;
    });
    if (result) {
    }
  }

  public decline() {
    let result = false;
    this.rejectMessage = prompt('Введите причину отклонения:') || "";
    confirm("<p>Вы уверены?</p>", "Подтвердите").then(x => {
      result = x;
    });

    if (result) {
    }
  }

  // @ts-ignore
  public bookDisplayExpr = (data) => {
    return data ? data.title + ', автор: ' + data.authors.map((x: any) => x.name).join(' ') + ', жанр: ' + data.genre.name : null;
  }
}
