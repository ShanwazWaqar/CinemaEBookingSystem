import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss']
})
export class BookTicketsComponent implements OnInit {
  showtimesArray:any;

 
  constructor(private router: Router,private bms:bmsApiService) { }

  ngOnInit(): void {
  }
  bookSeats() {
    this.router.navigateByUrl('/bookSeats');
  }
 
 
  showtimes(event:any){
    //console.log(event.value)
    let obj :any = ""
    console.log(this.convert(event.value))
    obj={
      
      date:String(this.convert(event.value))
    }
    //console.log(obj)
    obj = JSON.stringify(obj);
    this.bms.getscheduleinfo(obj).subscribe((res)=>{
      if(res){
  this.showtimesArray=res;
      }
    })
  }
  convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

}
