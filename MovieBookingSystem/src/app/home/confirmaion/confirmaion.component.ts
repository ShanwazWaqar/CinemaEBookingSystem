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
      this.total = Number(this.movie.ticketCost + 10).toFixed(2);
      // need order id from backend.
      console.log(this.movie," movie")
    })
  }

}
