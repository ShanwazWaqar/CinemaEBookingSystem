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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditMovieComponent } from './admin/edit-movie/edit-movie.component';

import {CarouselModule} from 'primeng/carousel';
import { PopupTraierComponent } from './home/popup-traier/popup-traier.component';
import { SafePipe } from './home/safe.pipe';
import { SignUpCompComponent } from './home/sign-up-comp/sign-up-comp.component';
import { LoginComponent } from './home/login/login.component';
import { SuccessPopupComponent } from './home/success-popup/success-popup.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { UserHomeScreenComponent } from './home/user-home-screen/user-home-screen.component';
import { EditUserProfileComponent } from './home/edit-user-profile/edit-user-profile.component';
import { UserHeaderComponent } from './home/user-header/user-header.component';
import { ArchiveMovieComponent } from './admin/archive-movie/archive-movie.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule,  NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScheduleMovieComponent } from './admin/schedule-movie/schedule-movie.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { UnarchiveMoviesComponent } from './admin/unarchive-movies/unarchive-movies.component';
import { SynopsisPageComponent } from './home/synopsis-page/synopsis-page.component';
import { BookTicketsComponent } from './home/book-tickets/book-tickets.component';
import { BookSeatsComponent } from './home/book-seats/book-seats.component';
import { SelectAgesComponent } from './home/select-ages/select-ages.component';
import { OrderConfirmationComponent } from './home/order-confirmation/order-confirmation.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { ConfirmaionComponent } from './home/confirmaion/confirmaion.component';
import { HttpClientModule } from '@angular/common/http';
import { bmsApiService } from './services/bmsapi.service';
import { NewAdminComponent } from './admin/new-admin/new-admin.component'

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
    AddNewMovieComponent,
    EditMovieComponent,
    PopupTraierComponent,
    SafePipe,
    SignUpCompComponent,
    LoginComponent,
    SuccessPopupComponent,
    UserHomeScreenComponent,
    EditUserProfileComponent,
    UserHeaderComponent,
    ArchiveMovieComponent,
    ScheduleMovieComponent,
    UnarchiveMoviesComponent,
    SynopsisPageComponent,
    BookTicketsComponent,
    BookSeatsComponent,
    SelectAgesComponent,
    OrderConfirmationComponent,
    CheckoutComponent,
    ConfirmaionComponent,
    NewAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ModalModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
    CarouselModule,
    YouTubePlayerModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    HttpClientModule

  ],
  providers: [bmsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
