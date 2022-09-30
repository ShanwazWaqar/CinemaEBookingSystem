import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unarchive-movies',
  templateUrl: './unarchive-movies.component.html',
  styleUrls: ['./unarchive-movies.component.scss']
})
export class UnarchiveMoviesComponent implements OnInit {

  movies = [
    {
      movieName : "Baby Driver",
      archive : "Baby Driver",
      Schedule : "ShanwazKotekanti@gmail.com",
      update : ""
    },
    {
      firstname : "Naveen",
      lastName : "Kurra",
      gmail : "naveenKurra@gmail.com",
      movieName : "Bohemain",
    },
    {
      firstname : "punith",
      lastName : "kandula",
      gmail : "punithkandula@gmail.com",
      movieName : "Black Adam",
    },
    // {
    //   firstname : "raymond",
    //   lastName : "feckoury",
    //   gmail : "raymondFeckoury@gmail.com",
    //   movieName : "West Side Story",
    // },
    // {
    //   firstname : "raymond",
    //   lastName : "feckoury",
    //   gmail : "raymondFeckoury@gmail.com",
    //   movieName : "The God Father",
    // },
    // {
    //   firstname : "raymond",
    //   lastName : "feckoury",
    //   gmail : "raymondFeckoury@gmail.com",
    //   movieName : "HangOver II",
    // },
    {
      firstname : "raymond",
      lastName : "feckoury",
      gmail : "raymondFeckoury@gmail.com",
      movieName : "Alita",
    },
    {
      firstname : "raymond",
      lastName : "feckoury",
      gmail : "raymondFeckoury@gmail.com",
      movieName : "Suicide Squad",
    },
    {
      firstname : "raymond",
      lastName : "feckoury",
      gmail : "raymondFeckoury@gmail.com",
      movieName : "Joy",
    },
    {
      firstname : "raymond",
      lastName : "feckoury",
      gmail : "raymondFeckoury@gmail.com",
      movieName : "Drive",
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  removeArchive(ind:any) {
    this.movies.splice(ind,1);
  }

}
