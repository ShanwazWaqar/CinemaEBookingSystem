import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../app/user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { SignUpCompComponent } from './home/sign-up-comp/sign-up-comp.component';
import { LoginComponent } from './home/login/login.component';
import { UserHomeScreenComponent } from './home/user-home-screen/user-home-screen.component';
import { EditUserProfileComponent } from './home/edit-user-profile/edit-user-profile.component';
import { SynopsisPageComponent } from './home/synopsis-page/synopsis-page.component';
import { BookTicketsComponent } from './home/book-tickets/book-tickets.component';
import { BookSeatsComponent } from './home/book-seats/book-seats.component';
import { SelectAgesComponent } from './home/select-ages/select-ages.component';
import { OrderConfirmationComponent } from './home/order-confirmation/order-confirmation.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { ConfirmaionComponent } from './home/confirmaion/confirmaion.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'adminHomePage', component: AdminHomeComponent },
  { path: 'SignUp', component: SignUpCompComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'userHomePage', component: UserHomeScreenComponent },
  { path: 'editUserProfile', component: EditUserProfileComponent },
  { path: 'synopsis', component: SynopsisPageComponent },
  { path: 'bookTickets', component: BookTicketsComponent },
  { path: 'bookSeats', component: BookSeatsComponent },
  { path: 'selectAges', component: SelectAgesComponent },
  { path: 'orderConfirmation', component: OrderConfirmationComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirmation', component: ConfirmaionComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
