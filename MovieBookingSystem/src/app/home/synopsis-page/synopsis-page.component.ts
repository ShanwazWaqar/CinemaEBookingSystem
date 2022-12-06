import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupTraierComponent } from '../popup-traier/popup-traier.component';
import { bmsApiService } from '../../services/bmsapi.service';
import { MsgPopupHomeComponent } from '../msg-popup-home/msg-popup-home.component';

@Component({
  selector: 'app-synopsis-page',
  templateUrl: './synopsis-page.component.html',
  styleUrls: ['./synopsis-page.component.scss']
})
export class SynopsisPageComponent implements OnInit {
title:String
rating:String
duration:String
producer:String
director:String
cast:String
synopsis:String
category:String
link:String
imageLink:String
isUpcoming:any;
email:any;
isVerifiedUser:any;

  constructor(private dialogRef: MatDialog,private router: Router,private bms: bmsApiService, private route:ActivatedRoute) {
    this.route.params.subscribe( params => { 
      this.title = params.movieName;
      this.isUpcoming = params.id == 1? true:false;
    });
   }

  ngOnInit(): void {
    let obj:any
    obj={
      title: this.title
    }
    obj = JSON.stringify(obj);
    this.bms.getmovieinfo(obj).subscribe((res)=>{
     if(res){
          this.title=res.title;
          this.rating=res.rating.split(":")[0];
          this.director=res.director
          this.duration="2:55:00"; // duration needs to be added
          this.producer=res.producer;
          this.cast=res.cast;
          this.synopsis=res.synopsis;
          this.imageLink = res.thumbnail;
          this.category=res.category.toString();
          this.link=res.trailer.split("=",)[1];
        } 
   });
    this.email = (localStorage.getItem("loggedIn")); 
  }

  openTrailerPopup() {
  
    const popup = this.dialogRef.open(PopupTraierComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      data: {url : this.link},
    });
    popup.afterClosed().subscribe(item =>{
      if(item){
        
      }
    });
  }

  styleObject(): Object {
    
        return {
          "background-image": "url("+this.imageLink+")",
          "background-repeat": "no-repeat",
          "background-size": "400px 540px",
          "z-index": "2",
        };
}

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  sucessPopup(msg:any) {
    const popup2 = this.dialogRef.open(MsgPopupHomeComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '400px',
      data: msg
    });
    popup2.afterClosed().subscribe(item =>{
      
    });
  }

  bookTickets() {
    this.router.navigate(['/bookTickets', this.title]);
    // let email2 = (localStorage.getItem("user"));
    // let cred:any = "";
    //   cred = {
    //     email: email2,
    //   }
    //   cred = JSON.stringify(cred);
    //   if(this.email == undefined || this.email == "false") {
    //     this.sucessPopup("Please Login to Book Tickets.");
    //     this.router.navigateByUrl("/home");
    //   }else {
    //     this.bms.verfiedUser(cred).subscribe((res) => {
    //       console.log(res," res");
    //       if (res) {
    //         this.router.navigate(['/bookTickets', this.title]);
    //       } else {
    //         this.sucessPopup("Please Verify your Account to Book Tickets.");
    //       }
    //     });
    //   }
  }

}
