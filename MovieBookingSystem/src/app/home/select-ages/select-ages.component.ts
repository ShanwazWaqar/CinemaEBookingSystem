import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-ages',
  templateUrl: './select-ages.component.html',
  styleUrls: ['./select-ages.component.scss']
})
export class SelectAgesComponent implements OnInit {
  movie:any
  email:any;
  seats:any;
  totalSeats:any;
  seatTypes:any;
  childSeats:any = 0;
  adultSeats:any = 0;
  seniorSeats:any = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.email = (localStorage.getItem("user"));
    this.movie = (localStorage.getItem("movie"));
    this.movie = JSON.parse(this.movie);
    this.seats = this.movie.selectedSeatsList.length;
    this.totalSeats = this.seats;
  }

  orderConfirmation() {
    if(this.seats == 0) {
      this.movie['childSeats'] = this.childSeats;
      this.movie['adultSeats'] = this.adultSeats;
      this.movie['seniorSeats'] = this.seniorSeats;
      localStorage.setItem("movie",JSON.stringify(this.movie));
      this.router.navigateByUrl('/orderConfirmation');
    }
  }

  addChild() {
    if(this.seats > 0) {
      this.seats = this.seats-1;
      this.childSeats = this.childSeats+1;
    } else {
      //seats are going beyond zero.
    }
  }

  removeChild() { 
    if(this.seats < this.totalSeats) {
      this.seats = this.seats + 1;
      this.childSeats = this.childSeats - 1;
    } else {
      //seats are being removed before add.
    }
  }

  removeAdult() {  
    if(this.seats < this.totalSeats) {
      this.seats = this.seats + 1;
      this.adultSeats = this.adultSeats - 1;
    } else {
      //seats are being removed before add.
    }
  }

  addAdult() { 
    if(this.seats > 0) {
      this.seats = this.seats-1;
      this.adultSeats = this.adultSeats + 1;
    } else {
      //seats are going beyond zero.
    }
  }

  removeSenior() {
    if(this.seats < this.totalSeats) {
      this.seats = this.seats + 1;
      this.seniorSeats = this.seniorSeats -1;
    } else {
      //seats are being removed before add.
    }
  }

  addSenior() { 
    if(this.seats > 0) {
      this.seats = this.seats-1;
      this.seniorSeats = this.seniorSeats + 1;
    } else {
      //seats are going beyond zero.
    }
  }



}
