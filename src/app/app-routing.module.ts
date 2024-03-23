import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { TasksComponent } from './pages/tasks/tasks.component';
import {DxButtonModule, DxDataGridModule, DxFormModule} from 'devextreme-angular';
import {OfferPopupComponent} from "./pages/tasks/offer-popup/offer-popup.component";
import {BooksComponent} from "./pages/books/books.component";
import {GenresComponent} from "./pages/genres/genres.component";
import {AuthorsComponent} from "./pages/authors/authors.component";

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'genres',
    component: GenresComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'authors',
    component: AuthorsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), DxDataGridModule, DxFormModule, DxButtonModule, OfferPopupComponent],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
  ]
})
export class AppRoutingModule { }
