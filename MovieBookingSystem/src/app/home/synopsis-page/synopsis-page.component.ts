import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Router } from '@angular/router';
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


  constructor(private dialogRef: MatDialog,private router: Router,private bms: bmsApiService) { }

  ngOnInit(): void {
    this.bms.getmovieinfo().subscribe((res)=>{
     if(res){
          //console.log()
          this.title=res[0]
          this.rating=res[1]
          this.director=res[2]
          this.duration="2:55:00"
          this.producer=res[3]
          this.cast=res[4]
          this.synopsis=res[5]
          this.category=res[6]
          this.link=res[7].split("=",);
          this.link=this.link[1]
          //console.log()

        }
      
   })
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

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  bookTickets() {
    this.router.navigateByUrl('/bookTickets');
  }

}
