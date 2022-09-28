import { Component, HostListener, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { EditMovieComponent } from '../edit-movie/edit-movie.component'
@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.scss']
})
export class ManageMoviesComponent implements OnInit {
  currentMoviesSelected:boolean = false;
  addmoviesSelected:boolean = false;
  archiveMoviesSelected:boolean = false;
  scheduleMoviesSelected:boolean = false;

  movies = [
    {
      id: 1,
      title: "Baby Driver",
      image: '../../../assets/images/movie1.jpg',
    },
    {
      id: 2,
      title: "Bohemain",
      image: '../../../assets/images/movie2.jpg',
    },
    {
      id: 3,
      title: "Black Adam",
      image: '../../../assets/images/movie3.webp',
    },
    {
      id: 4,
      title: "West Side Story",
      image: '../../../assets/images/movie4.jpg',
    },
    {
      id: 5,
      title: "The Godfather",
      image: '../../../assets/images/movie5.jpg',
    },
    {
      id: 6,
      title: "Hangover II",
      image: '../../../assets/images/movie6.jpg',
    },
    // {
    //   id: 7,
    //   title: "title1",
    //   image: '../../../assets/images/movie7.jpg',
    // },
    // {
    //   id: 8,
    //   title: "title1",
    //   image: '../../../assets/images/movie8.jpg',
    // },
    // {
    //   id: 9,
    //   title: "title1",
    //   image: '../../../assets/images/movie9.webp',
    // },
    // {
    //   id: 10,
    //   title: "title1",
    //   image: '../../../assets/images/movie10.jpg',
    // },
  ];
  constructor(private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.currentMoviesSelected = true;
    // this.addmoviesSelected = true;
  }

  addMovies() {
    this.currentMoviesSelected = false;
    this.addmoviesSelected = true;
    this.archiveMoviesSelected = false;
    this.scheduleMoviesSelected = false;
  }

  showCurrentMovies() {
    this.currentMoviesSelected = true;
    this.addmoviesSelected = false;
    this.archiveMoviesSelected = false;
    this.scheduleMoviesSelected = false;
  }

  archiveMovies() {
    this.currentMoviesSelected = false;
    this.addmoviesSelected = false;
    this.archiveMoviesSelected = true;
    this.scheduleMoviesSelected = false;

  }

  scheduleMovies() {
    this.currentMoviesSelected = false;
    this.addmoviesSelected = false;
    this.archiveMoviesSelected = false;
    this.scheduleMoviesSelected = true;
  }

  openEditMoviePopup(ind:any) {
    const popup = this.dialogRef.open(EditMovieComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '900px',
      data: this.movies[ind],
    });
    popup.afterClosed().subscribe(item =>{
      if(item){
        this.movies[ind].title = item.title
      }
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }
}
