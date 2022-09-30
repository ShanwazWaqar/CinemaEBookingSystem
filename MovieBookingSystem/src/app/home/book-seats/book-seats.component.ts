import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-seats',
  templateUrl: './book-seats.component.html',
  styleUrls: ['./book-seats.component.scss']
})
export class BookSeatsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ageSelection() {
    this.router.navigateByUrl('/selectAges');
  }

}
