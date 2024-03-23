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
  }
  approveOffer(approveDto: any) {
    return this.http.post(this._baseUrl + 'approve', approveDto, this.header);
  }

  rejectOffer(rejectDto: any) {
    return this.http.patch(this._baseUrl + 'approve', rejectDto, this.header);
  }
}
