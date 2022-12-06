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
      console.log(this.movie.cardNo," cardNo")
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
          // "cardnumber": this.movie.cardNo.split(" ")[(this.movie.cardNo.split(" ").length-1)],
          "totalamount": this.movie.ticketCost,
          "seatnumbers": this.movie.selectedSeatsList.toString()
      };
      obj = JSON.stringify(obj);
      this.bms.ticketBooked(obj).subscribe(res=> {
        this.movie.orderId = res.orderid;
      })
      for(let i=0;i<this.movie.selectedSeatsList.length;i++){
        let obj2:any;
        obj2={
          screennumber:this.movie.screen,
          time:this.movie.movieTime,
          date:this.movie.movieDate,
          seatnumber:this.movie.selectedSeatsList[i],
          seatoccupancy:1
        }
        console.log(obj2)
        obj2=JSON.stringify(obj2)
        this.bms.updateseats(obj2).subscribe(res=>{
            console.log("result")
        })
      }
      

    });
  }
  convert(value: any) {
    var date = new Date(value),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

}
