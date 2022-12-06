import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupTraierComponent } from '../popup-traier/popup-traier.component';
import { Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';
import { MsgPopupHomeComponent } from '../msg-popup-home/msg-popup-home.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  genres = ["Action", "Horror", "Thriller", "Comedy", "Drama", "Adventure", "Documentary", "Fiction", "Mystery", "Animation"];
  responsiveOptions: any;
  searching: boolean = true;
  searchComp: boolean = false;
  currentPlaying: boolean = false;
  currentMovies: any = [];
  upcomingMovies: any = [];
  tempCurrentMovies: any = [];
  tempUpcomingMovies: any = [];
  totalMovies: any = [];
  @Input() searchText = '';
  count = 0;
  currentFilterCategory = "";
  upcomingFilterCategory = "";

  constructor(private dialogRef: MatDialog, private router: Router, private bms: bmsApiService, private spinner: NgxSpinnerService) {
    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 3
    }];
  }

  filterMovies() {
    for (let i = 0; i < this.totalMovies.length; i++) {
      if (this.totalMovies[i].isarchive != 1) {
        this.totalMovies[i].rating2 = (this.totalMovies[i].rating.split(":"))[0];
        if (this.totalMovies[i].currentrunning == 1) {
          this.currentMovies.push(this.totalMovies[i]);
        } else {
          this.upcomingMovies.push(this.totalMovies[i]);
        }
      }
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    this.bms.getMoviesList().subscribe(res => {
      if (res) {
        this.totalMovies = res;
        this.filterMovies();
        this.tempCurrentMovies = this.currentMovies;
        this.tempUpcomingMovies = this.upcomingMovies;
        this.searching = false;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  ngOnChanges() {
    if (this.count == 0) {
      if (this.searchText) {
        this.searching = false;
      } else {
        this.searching = true;
      }
    } else {
      if (this.searchText) {
        this.searching = true;
      } else {
        this.searching = false;
      }
    }
    this.count++;
  }

  openTrailerPopup(link: any) {

    link = link.split("=",);
    link = link[1]
    console.log(link)
    const popup = this.dialogRef.open(PopupTraierComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '1000ms',
      maxHeight: '80vh',

      data: { url: link },
    });
    popup.afterClosed().subscribe(item => {
      if (item) {

      }
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  showSynopsisPage(movie: any, upcoming?: any) {
    let id: any = 1;
    if (upcoming) {
      id = 0;
    }
    this.router.navigate(['/synopsis', movie.title, id]);

  }

  bookTicketsPage(movie: any) {
    this.router.navigate(['/bookTickets', movie.title]);
    // let email = (localStorage.getItem("loggedIn"));
    // if (email == undefined || email == "false") {
    //   this.sucessPopup("Please Login to Book Tickets.");
    //   this.router.navigateByUrl("/home");
    // } else {
      
    // }
    // let email2 = (localStorage.getItem("user"));
    //   let cred: any = "";
    //   cred = {
    //     email: email2,
    //   }
    //   cred = JSON.stringify(cred);
    //   this.bms.verfiedUser(cred).subscribe((res) => {
    //     if (res) {
    //       this.router.navigate(['/bookTickets', movie.title]);
    //     } else {
    //       this.sucessPopup("Please Verify your Account to Book Tickets.");
    //     }
    //   });
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

  currentPlayingFilter() {
    this.searchComp = false;
    this.searching = false;
    this.currentPlaying = true;
  }


  currentCategory(category: any) {
    this.currentFilterCategory = category;
    if (category == "All") {
      this.currentMovies = this.tempCurrentMovies;
    } else {
      this.currentMovies = []
      for (let i = 0; i < this.tempCurrentMovies.length; i++) {
        for (let j = 0; j < this.tempCurrentMovies[i].category.length; j++) {
          if (this.tempCurrentMovies[i].category[j] == category) {
            this.currentMovies.push(this.tempCurrentMovies[i]);
          }
        }
      }
    }
  }

  upcomingCategory(category: any) {
    this.upcomingFilterCategory = category;
    if (category == "All") {
      this.upcomingMovies = this.tempUpcomingMovies;
    } else {
      this.upcomingMovies = []
      for (let i = 0; i < this.tempUpcomingMovies.length; i++) {
        for (let j = 0; j < this.tempUpcomingMovies[i].category.length; j++) {
          if (this.tempUpcomingMovies[i].category[j] == category) {
            this.upcomingMovies.push(this.tempUpcomingMovies[i]);
          }
        }
      }
    }
  }

}