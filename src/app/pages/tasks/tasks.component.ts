import {Component, OnInit, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import {BooksService, ModerationService} from "../../shared/services";
import {OfferPopupComponent} from "./offer-popup/offer-popup.component";
import {DxButtonModule, DxDataGridModule} from "devextreme-angular";
import {OfferModel} from "../../shared/models/offer.model";

@Component({
  standalone: true,
  imports: [
    OfferPopupComponent,
    DxButtonModule,
    DxDataGridModule
  ],
  templateUrl: 'tasks.component.html'
})

export class TasksComponent implements OnInit {
  // @ts-ignore
  @ViewChild(OfferPopupComponent) offerPopup: OfferPopupComponent;
  public dataSource: any;
  constructor(private moderationService: ModerationService) {
  }

  ngOnInit() {
    this.moderationService.getOffers().subscribe((offers: any) => {
      this.dataSource = offers.offers;
    });
  }
  public openOfferPopup(e: OfferModel) {
    this.offerPopup.open(e);
  }
}
