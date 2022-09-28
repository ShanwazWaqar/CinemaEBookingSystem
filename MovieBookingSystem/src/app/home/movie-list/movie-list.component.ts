import { Component, HostListener, OnInit } from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { PopupTraierComponent } from '../popup-traier/popup-traier.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  responsiveOptions:any;
  currentMovies = [
    {
      id: 1,
      title: "Baby Driver",
      image: '../../../assets/images/movie1.jpg',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/embed/D9YZw_X5UzQ"
    },
    {
      id: 2,
      title: "Bohemain",
      image: '../../../assets/images/movie2.jpg',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/watch?v=mP0VHJYFOAU"
    },
    {
      id: 3,
      title: "Black Adam",
      image: '../../../assets/images/movie3.webp',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/watch?v=X0tOpBuYasI"
    },
    {
      id: 4,
      title: "West Side Story",
      image: '../../../assets/images/movie4.jpg',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/watch?v=A5GJLwWiYSg"
    },
    {
      id: 5,
      title: "The Godfather",
      image: '../../../assets/images/movie5.jpg',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/watch?v=UaVTIH8mujA"
    },
    {
      id: 6,
      title: "Hangover II",
      image: '../../../assets/images/movie6.jpg',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/watch?v=ohF5ZO_zOYU"
    },
    {
      id: 7,
      title: "Alita",
      image: '../../../assets/images/movie7.jpg',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/watch?v=w7pYhpJaJW8"
    },
    {
      id: 8,
      title: "Suicide Squad",
      image: '../../../assets/images/movie8.jpg',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/watch?v=CmRih_VtVAs"
    },
    {
      id: 9,
      title: "Joy",
      image: '../../../assets/images/movie9.webp',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/watch?v=uR-2TiQVY-k"
    },
    {
      id: 10,
      title: "Drive",
      image: '../../../assets/images/movie10.jpg',
      duration: '1h 35m',
      trailer: "https://www.youtube.com/watch?v=KBiOF3y1W0Y"
    },
  ];
  constructor( private dialogRef: MatDialog) { 
    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 3
  }];
  }

  ngOnInit(): void {
  }

  openTrailerPopup(link:any) {
    console.log(link," link");
    const popup = this.dialogRef.open(PopupTraierComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '900px',
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

}
