import { Component, HostListener, Input, OnInit } from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { PopupTraierComponent } from '../popup-traier/popup-traier.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  responsiveOptions:any;
  searching:boolean = false;
  @Input() searchText = ''; 
  currentMovies = [
    {
      id: 1,
      title: "Baby Driver",
      image: '../../../assets/images/movie1.jpg',
      duration: '1h 35m',
      rating: 'R',
      trailer: "D9YZw_X5UzQ",
      category: "Action,Comedy,Drama,,Western"
    },
    {
      id: 2,
      title: "Bohemain",
      image: '../../../assets/images/movie2.jpg',
      duration: '1h 35m',
      trailer: "mP0VHJYFOAU",
      rating: 'PG-13',
      category: "Action,Comedy,Drama,Fantasy,Horror,Mystery,Romance,Thriller"
    },
    {
      id: 3,
      title: "Black Adam",
      image: '../../../assets/images/movie3.webp',
      duration: '1h 35m',
      trailer: "X0tOpBuYasI",
      rating: 'NC-17',
      category: "Action,Horror,Mystery,Romance,Thriller,Western"
    },
    {
      id: 4,
      title: "West Side Story",
      image: '../../../assets/images/movie4.jpg',
      duration: '1h 35m',
      trailer: "A5GJLwWiYSg",
      rating: 'R',
      category: "Action,Comedy,Drama,Fantasy,Horror,Mystery,Romance,Thriller,Western"
    },
    {
      id: 5,
      title: "The Godfather",
      image: '../../../assets/images/movie5.jpg',
      duration: '1h 35m',
      trailer: "UaVTIH8mujA",
      rating: 'PG',
      category: "Action,Comedy,Drama,Fantasy,Horror,Mystery,Romance,Thriller,Western"
    },
    {
      id: 6,
      title: "Hangover II",
      image: '../../../assets/images/movie6.jpg',
      duration: '1h 35m',
      trailer: "ohF5ZO_zOYU",
      rating: 'NC-17',
      category: "Action,Romance,Thriller,Western"
    },
    {
      id: 7,
      title: "Alita",
      image: '../../../assets/images/movie7.jpg',
      duration: '1h 35m',
      trailer: "w7pYhpJaJW8",
      rating: 'PG',
      category: "Action,Comedy,Drama,Fantasy,Horror,Mystery,Romance,Thriller,Western"
    },
    {
      id: 8,
      title: "Suicide Squad",
      image: '../../../assets/images/movie8.jpg',
      duration: '1h 35m',
      trailer: "CmRih_VtVAs",
      rating: 'G',
      category: "Action,Comedy,Dram,Thriller,Western"
    },
    {
      id: 9,
      title: "Joy",
      image: '../../../assets/images/movie9.webp',
      duration: '1h 35m',
      trailer: "uR-2TiQVY-k",
      rating: 'PG-13',
      category: "Fantasy,Horror,Mystery,Romance,Thriller,Western"
    },
    {
      id: 10,
      title: "Drive",
      image: '../../../assets/images/movie10.jpg',
      duration: '1h 35m',
      trailer: "KBiOF3y1W0Y",
      rating: 'PG',
      category: "Action,Comedy,Drama,Fantasy,Horror,Mystery,Romance,Thriller,Western"
    },
    {
      id: 11,
      title: "Black Panther: Wakanda Forever",
      image: '../../../assets/images/movie11.jpg',
      duration: '2h 41m',
      trailer: "/_Z3QKkl1WyM",
      rating: 'NC-17',
      category: "Action,Comedy,Drama,Fantasy,Horror,Mystery,Romance,Thriller,Western"
    },
  ];
  constructor( private dialogRef: MatDialog,private router: Router) { 
    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 3
  }];
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    if(this.searchText){
      this.searching = true;
    } else { 
      this.searching = false;
    }
  }

  openTrailerPopup(link:any) {
    console.log(link," link");
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

  showSynopsisPage() {
    this.router.navigateByUrl('/synopsis');
  }

  bookTicketsPage() {
    this.router.navigateByUrl('/bookTickets');
  }

}
