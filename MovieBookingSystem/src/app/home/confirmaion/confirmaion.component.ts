import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-confirmaion',
  templateUrl: './confirmaion.component.html',
  styleUrls: ['./confirmaion.component.scss']
})
export class ConfirmaionComponent implements OnInit {
  email:any;
  movie:any;
  total:any = 0;
  constructor(private dialogRef: MatDialog,private router: Router,private bms: bmsApiService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.email = (localStorage.getItem("user"));
    this.movie = (localStorage.getItem("movie"));
    this.movie = JSON.parse(this.movie);
    let obj:any
    obj={
      title: this.movie.movieName
    }
    obj = JSON.stringify(obj);
    this.bms.getmovieinfo(obj).subscribe(res=> {
      this.movie.rating = res.rating.split(":")[0];
      this.movie.runtime = "1h 20m";
      this.movie.ticketCost = this.movie.ticketCost.toFixed(2);
      this.total = Number(this.movie.ticketCost)+Number(10);
      this.total = Number(this.total).toFixed(2);
      // need order id from backend.
      let obj:any;
      obj = 
        {
          "title": this.movie.movieName,
          "email":  this.email,
          "date": this.movie.movieTiming,
          "time": this.movie.movieTime,
          "screennumber": this.movie.screen,
          "numberoftcikets": (this.movie.adultSeats+this.movie.childSeats+this.movie.seniorSeats),
          "adultseats": this.movie.adultSeats,
          "childseats": this.movie.childSeats,
          "seniorseats": this.movie.seniorSeats,
          "cardnumber": this.movie.cardNo.split(" ")[(this.movie.cardNo.split(" ").length-1)],
          "totalamount": this.movie.ticketCost,
          "seatnumbers": this.movie.selectedSeatsList.toString()
      };
      console.log(obj);
      obj = JSON.stringify(obj);
      this.bms.ticketBooked(obj).subscribe(res=> {
        console.log(res," response");
      })

    })
  }

}
