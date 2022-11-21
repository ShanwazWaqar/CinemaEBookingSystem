import { Component, HostListener, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { bmsApiService } from 'src/app/services/bmsapi.service';
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

  movies:any ;
  constructor(private dialogRef: MatDialog, private bms: bmsApiService) { }

  ngOnInit(): void {
    this.currentMoviesSelected = true;
    // this.addmoviesSelected = true;
    this.bms.getMoviesList().subscribe(res=>{
      console.log(res," res of movies list");
      this.movies = [];
      for(let i=0;i<res.length;i++) {
        let obj = {
          title: res[i].title,
          image: res[i].thumbnail,
          status: res[i].currentrunning == 1 ? "Currently Playing" : "Upcoming Soon"
        };
        this.movies.push(obj);
      }
      console.log(this.movies," movies list");
    });
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
