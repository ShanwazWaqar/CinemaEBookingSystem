import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';
import { MsgPopupHomeComponent } from '../msg-popup-home/msg-popup-home.component';

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
  userHeader:any = false;
  constructor(private router: Router, private dialogRef: MatDialog, private bms: bmsApiService) { }

  ngOnInit(): void {
    this.email = (localStorage.getItem("user"));
    if(localStorage.getItem("loggedIn") == "false") {
      this.userHeader = false;
    } else {
      this.userHeader = true;
    }
    this.movie = (localStorage.getItem("movie"));
    this.movie = JSON.parse(this.movie);
    this.seats = this.movie.selectedSeatsList.length;
    this.totalSeats = this.seats;
  }

  sucessPopup(msg: any) {
    const popup2 = this.dialogRef.open(MsgPopupHomeComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '1000ms',
      maxHeight: '80vh',
      width: '400px',
      data: msg
    });
    popup2.afterClosed().subscribe(item => {

    });
  }

  orderConfirmation() {
    if(this.seats == 0) {
        let email = (localStorage.getItem("loggedIn"));
        if (email == undefined || email == "false") {
          this.sucessPopup("Please Login to Book Tickets.");
          setTimeout (() => {
            this.router.navigateByUrl("/home");
         }, 3000);
        } else {
          let email2 = (localStorage.getItem("user"));
        let cred:any = "";
          cred = {
            email: email2,
          }
          cred = JSON.stringify(cred);
          this.bms.verfiedUser(cred).subscribe((res) => {
            if (res) {
              this.movie['childSeats'] = this.childSeats;
              this.movie['adultSeats'] = this.adultSeats;
              this.movie['seniorSeats'] = this.seniorSeats;
              localStorage.setItem("movie",JSON.stringify(this.movie));
              this.router.navigateByUrl('/orderConfirmation');
            } else {
              this.sucessPopup("Please Verify your Account to Book Tickets.");
            }
          });  
        }
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
