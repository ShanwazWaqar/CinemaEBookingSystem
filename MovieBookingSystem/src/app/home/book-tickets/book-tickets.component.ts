import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss']
})
export class BookTicketsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  bookSeats() {
    this.router.navigateByUrl('/bookSeats');
  }

}
