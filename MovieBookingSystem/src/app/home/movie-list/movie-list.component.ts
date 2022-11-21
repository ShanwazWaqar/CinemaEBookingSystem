import { Component, HostListener, Input, OnInit } from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { PopupTraierComponent } from '../popup-traier/popup-traier.component';
import { Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';
import { MsgPopupHomeComponent } from '../msg-popup-home/msg-popup-home.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  responsiveOptions:any;
  searching:boolean = true;
  searchComp:boolean = false;
  currentPlaying:boolean = false;
  currentMovies:any = [];
  upcomingMovies:any = [];
  @Input() searchText = ''; 
  
  constructor( private dialogRef: MatDialog,private router: Router, private bms:bmsApiService) { 
    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 3
  }];
  }

  ngOnInit(): void {
    this.bms.getMoviesList().subscribe(res=>{
      for(let i=0;i<res.length;i++) {
        if(res[i].currentrunning == 1) {
          res[i].rating2 = (res[i].rating.split(":"))[0];
          this.currentMovies.push(res[i]);  
        }else {
          this.upcomingMovies.push(res[i]);
        }
      }
      this.searching = false;
    });
  }

  ngOnChanges(){
    if(this.searchText){
      this.searching = false;
      this.searchComp = true;
    } else { 
      this.searching = true;
      this.searchComp = false;
    }
  }

  openTrailerPopup(link:any) {
    
    link=link.split("=",);
    link=link[1]
    console.log(link)
    const popup = this.dialogRef.open(PopupTraierComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',

      data: {url : link},
    });
    popup.afterClosed().subscribe(item =>{
      if(item){
        
      }
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  showSynopsisPage(movie:any,upcoming?:any) {
    let id:any = 1;
    if(upcoming) {
      id = 0;
    } 
    this.router.navigate(['/synopsis', movie.title, id]);
    
  }

  bookTicketsPage(movie:any) {
    let email = (localStorage.getItem("user")); 
    if( email == undefined) {
      this.sucessPopup("Please Login to Book Tickets.");
      this.router.navigateByUrl("/home");
    } else {
      this.router.navigate(['/bookTickets', movie.title]);
    }
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

  currentPlayingFilter() {
    this.searchComp = false;
    this.searching = false;
    this.currentPlaying = true;
  }

}
