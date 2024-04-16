import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import DevExpress from "devextreme";
import {DxButtonModule, DxFormModule, DxPopupModule, DxSelectBoxModule} from "devextreme-angular";
import {OfferModel} from "../../../shared/models/offer.model";
import {confirm} from "devextreme/ui/dialog"
import {BooksService, ModerationService} from "../../../shared/services";
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
  public books: any;
  public offer: OfferModel;
  public rejectMessage = "";
  public approveDto = {
    offerId: '',
    linkedBookId: 0
  }
  public rejectDto = {
    offerId: '',
    rejectReason: ''
  }

  constructor(private booksService: BooksService,
              private moderationService: ModerationService) {
    this.offer = {};
  }

  ngOnInit() {
    this.booksService.getBooks().subscribe((books: any) => {
      this.books = books.books;
    });
  }

  public open(offer: OfferModel) {
    this.isVisible = true;
    this.offer = offer;
  }

  public log(e: any) {
    console.log(e);
  }

  public approve() {
    confirm("<p>Вы уверены?</p>", "Подтвердите").then(x => {
      if (x) {
        this.approveDto.offerId = this.offer.id || "";
        this.moderationService.approveOffer(this.approveDto);
      }
    });

  }

  public reject() {
    let result = false;
    this.rejectDto.rejectReason = prompt('Введите причину отклонения:') || "";
    this.rejectDto.offerId = this.offer.id || "";
    confirm("<p>Вы уверены?</p>", "Подтвердите").then(x => {
      if (x) {
        this.moderationService.rejectOffer(this.rejectDto);
      }
    });

  }

  // @ts-ignore
  public bookDisplayExpr = (data) => {
    return data ? data.title + ', автор: ' + data.authors.map((x: any) => x.name).join(' ') + ', жанр: ' + data.genre.name : null;
  }
}
