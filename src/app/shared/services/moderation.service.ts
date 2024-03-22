import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {AdminBaseServiceService} from "./admin-base-service.service";

@Injectable()
export class ModerationService extends AdminBaseServiceService {
  private _baseUrl = environment.ModerationService;
  constructor(http: HttpClient) {
    super(http);
  }
  getOffers() {
    return this.http.get(this._baseUrl, this.header);
    /*return [{
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "Мастер и Маргарита",
      "description": "Книга о ...",
      "owner": {
        "id": 0,
        "name": "Иван Иванов"
      },
      "authors": "Михаил Булгаков",
      "price": 320,
      "moderationStatus": 0,
      "city": "Москва",
      "picture": "https://cdn.eksmo.ru/v2/ITD000000000912912/COVER/cover1__w600.jpg",
      "createdAt": "22.03.2024",
      "regectReason": "string"
    }, {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      "title": "Руслан и Людмила",
      "description": "Поэма о ...",
      "owner": {
        "id": 0,
        "name": "Петр Петров"
      },
      "authors": "Александр Пушкин",
      "price": 210,
      "moderationStatus": 0,
      "city": "Санкт Петербург",
      "picture": "https://img3.labirint.ru/rc/944cb157578833970cfefd06f962df85/363x561q80/books85/843775/cover.jpg?1644478022",
      "createdAt": "22.02.2024",
      "regectReason": "string"
    }]*/
  }
  approveOffer() {

  }
}
