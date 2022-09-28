import { Component, OnInit } from '@angular/core';

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
      title: "title1",
      image: '../../../assets/images/movie1.jpg',
    },
    {
      id: 2,
      title: "title1",
      image: '../../../assets/images/movie2.jpg',
    },
    {
      id: 3,
      title: "title1",
      image: '../../../assets/images/movie3.webp',
    },
    // {
    //   id: 4,
    //   title: "title1",
    //   image: '../../../assets/images/movie4.jpg',
    // },
    // {
    //   id: 5,
    //   title: "title1",
    //   image: '../../../assets/images/movie5.jpg',
    // },
    // {
    //   id: 6,
    //   title: "title1",
    //   image: '../../../assets/images/movie6.jpg',
    // },
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
  constructor() { }

  ngOnInit(): void {
    // this.currentMoviesSelected = true;
    this.addmoviesSelected = true;
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

  openEditMoviePopup() {
    // code for edit movie popup
  }
}
