import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { MovieListComponent } from './home/movie-list/movie-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ManageMoviesComponent } from './admin/manage-movies/manage-movies.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManagePromosComponent } from './admin/manage-promos/manage-promos.component';
import { ManageAdminComponent } from './admin/manage-admin/manage-admin.component';
import { PromoPopupComponent } from './admin/promo-popup/promo-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewMovieComponent } from './admin/add-new-movie/add-new-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    HomeComponent,
    HeaderComponent,
    MovieListComponent,
    AdminHomeComponent,
    ManageMoviesComponent,
    ManageUsersComponent,
    ManagePromosComponent,
    ManageAdminComponent,
    PromoPopupComponent,
    AddNewMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
