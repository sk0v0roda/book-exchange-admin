import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DxButtonModule, DxFormModule, DxPopupModule} from "devextreme-angular";
import notify from "devextreme/ui/notify";
import {PromoteService} from "../../services/promote.service";

@Component({
  selector: 'app-promote-popup',
  standalone: true,
  imports: [CommonModule, DxPopupModule, DxFormModule, DxButtonModule],
  templateUrl: './promote-popup.component.html',
  styleUrls: ['./promote-popup.component.scss']
})
export class PromotePopupComponent {
  public isVisible = false;
  public userEmail = {email: ""};

  constructor(private promoteService: PromoteService) {
  }
  open() {
    this.isVisible = true;
  }

  done() {
    this.promoteService.promoteToAdmin(this.userEmail.email).subscribe((email: any) => {
      notify(`Пользователь ${this.userEmail.email} повышен до администратора`, "success", 8000);
      this.isVisible = false;
    }, (err) => {
      notify(err.message, "error", 8000);
    });
  }

}
