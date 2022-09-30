import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToSeatSelectionPage() {
    this.router.navigateByUrl('/bookSeats');
  }

  gotoSelectAges() {
    this.router.navigateByUrl('/selectAges');
  }

  checkout() {
    this.router.navigateByUrl('/checkout');
  }

}
