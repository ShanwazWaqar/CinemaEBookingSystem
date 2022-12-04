import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  email:any;
  movie:any;
  tempmovie:any;
  adultTicketPrice:any = 14.69;
  childTicketPrice:any = 11.69;
  seniorTicketPrice:any = 13.19;
  promoText:any="";
  correctPromo:boolean = false;
  wrongPromo:boolean = false;
  movieImg:any ;
  percentage:any = 0;
  discountValue:any = 0;
  total:any;
  constructor(private router: Router, private bms: bmsApiService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.email = (localStorage.getItem("user"));
    this.movie = (localStorage.getItem("movie"));
    this.movie = JSON.parse(this.movie);
    this.tempmovie = this.movie;
    let obj: any;
    obj = {
      title: this.tempmovie.movieName
    }
    obj = JSON.stringify(obj);
    this.bms.getmoviePic(obj).subscribe(res=>{
      this.movieImg = res.image;
    })
    this.total = ((this.tempmovie.adultSeats * this.adultTicketPrice)+(this.tempmovie.childSeats * this.childTicketPrice)+(this.tempmovie.seniorSeats * this.seniorTicketPrice)-this.discountValue+10).toFixed(2);
    console.log(this.tempmovie," movie");
  }

  goToSeatSelectionPage() {
    this.router.navigateByUrl('/bookSeats');
  }

  gotoSelectAges() {
    this.router.navigateByUrl('/selectAges');
  }

  checkout() {
    this.movie.ticketCost = this.total-10;
    localStorage.setItem("movie",JSON.stringify(this.movie));
    this.router.navigateByUrl('/checkout');
  }

  promoBtn() {
    this.correctPromo = false;
    this.wrongPromo = false;
    console.log(this.promoText," promotext");
    let obj: any;
    obj = {
      pcode: this.promoText
    }
    obj = JSON.stringify(obj);
    this.bms.promoCheck(obj).subscribe(res=>{
      if(res.percentage) {
        this.correctPromo = true;
        this.percentage = res.percentage;
        this.discountValue = ((this.percentage/100)*((this.tempmovie.adultSeats * this.adultTicketPrice)+(this.tempmovie.childSeats * this.childTicketPrice)+(this.tempmovie.seniorSeats * this.seniorTicketPrice))).toFixed(2);
        this.total = ((this.tempmovie.adultSeats * this.adultTicketPrice)+(this.tempmovie.childSeats * this.childTicketPrice)+(this.tempmovie.seniorSeats * this.seniorTicketPrice)-this.discountValue+10).toFixed(2);
      } else {
        this.wrongPromo = true;
      }
    })
  }

}
