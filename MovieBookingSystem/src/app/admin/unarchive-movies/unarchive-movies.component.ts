import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-unarchive-movies',
  templateUrl: './unarchive-movies.component.html',
  styleUrls: ['./unarchive-movies.component.scss']
})
export class UnarchiveMoviesComponent implements OnInit {

  movies:any =[];

  constructor(private dialogRef: MatDialog,private bms: bmsApiService) { }

  ngOnInit(): void {
    this.archivedMovies();
  }

  archivedMovies() {
    this.bms.getMoviesList().subscribe(res=>{
      this.movies = res;
      console.log(this.movies," movies");
    });
  }

  removeArchive(ind:any,movie:any) {
    let obj:any;
    obj = {
      title: movie.title,
      isarchive: 0
    };
    obj = JSON.stringify(obj);;
    this.bms.archiveMovie(obj).subscribe(res=> {
      if(res) {
        this.archivedMovies();
      }
    })
  }

}
