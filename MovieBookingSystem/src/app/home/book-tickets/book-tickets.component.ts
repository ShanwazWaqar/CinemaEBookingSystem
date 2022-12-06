import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss']
})
export class BookTicketsComponent implements OnInit {
  todayDate:Date = new Date();
  showtimesArray: any;
  movieTitle:any;
  screenTemplate:any = [[],[],[],[],[],[]];
  screens:any = [[],[],[],[],[],[]];
  dateExists:boolean = false;
  email:any;
  date:any;
  userHeader:any = false;
  constructor(private router: Router, private bms: bmsApiService, private route:ActivatedRoute) {
    this.route.params.subscribe( params => { 
      this.movieTitle = params.movieName;
    });
  }

  ngOnInit(): void {
    this.email = (localStorage.getItem("user"));
    if(localStorage.getItem("loggedIn") == "false") {
      this.userHeader = false;
    } else {
      this.userHeader = true;
    }
  }
  bookSeats(item:any,screen:any) {
    let movieDate = new Date(this.date);
    const month = movieDate.toLocaleString('default', { month: 'long' });
    let movie = {
      movieName: this.movieTitle,
      movieTime: item,
      movieTiming: month+" "+movieDate.getDate(),
      screen: screen,
      movieDate : this.convert(this.date)
    }
    localStorage.setItem("movie",JSON.stringify(movie));
    console.log(movie," movie")
    this.router.navigateByUrl('/bookSeats');
  }

  returnHome() {
    this.router.navigateByUrl('/home');
  }

  emptyscreens() {
    this.screens=[[],[],[],[],[],[]];
  }


  showtimes(event: any) {
    this.date = event.value;
    if(event.value) {
      this.dateExists = true;
    }
    let obj: any = ""
    obj = {
      moviename: this.movieTitle,
      date: String(this.convert(event.value))
    }
    obj = JSON.stringify(obj);
    this.bms.getscheduleinfo(obj).subscribe((res) => {
      if (res) {
        let arr = res[1];
        for(let i=0;i<arr.length;i++) {
          this.screens[arr[i]-1].push(res[0][i]);
        }
      }
    })
  }
  convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  checkArrayValue() {
    for(let i=0;i<this.screens.length;i++) {
      if(this.screens[i].length>0) {
        return false;
      }
    }
    return true;
  }

}
