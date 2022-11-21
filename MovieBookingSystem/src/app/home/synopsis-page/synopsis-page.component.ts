import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupTraierComponent } from '../popup-traier/popup-traier.component';
import { bmsApiService } from '../../services/bmsapi.service';

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


  constructor(private dialogRef: MatDialog,private router: Router,private bms: bmsApiService, private route:ActivatedRoute) {
    this.route.params.subscribe( params => { 
      this.title = params.movieName;
      this.isUpcoming = params.id == 1? true:false;
    });
    console.log(this.isUpcoming," upccoming")
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
        };
}

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  bookTickets() {
    // this.router.navigateByUrl('/bookTickets',{ queryParams: { movieName:this.title } });
    this.router.navigate(['/bookTickets', this.title]);
  }

}
