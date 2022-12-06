import { Component, HostListener, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { bmsApiService } from 'src/app/services/bmsapi.service';
import { ScheduleMovieComponent } from '../schedule-movie/schedule-movie.component';


@Component({
  selector: 'app-archive-movie',
  templateUrl: './archive-movie.component.html',
  styleUrls: ['./archive-movie.component.scss']
})
export class ArchiveMovieComponent implements OnInit {

  movies:any = [];

  constructor(private dialogRef: MatDialog,private bms: bmsApiService) { }

  ngOnInit(): void {
    this.archivedMovies();
  }

  archivedMovies() {
    this.bms.getMoviesList().subscribe(res=>{
      this.movies = res;
    });
  }

  scheduleMovie(i:any) {
    console.log(i," ",this.movies[i]);
    const popup = this.dialogRef.open(ScheduleMovieComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '450px',
      height: '500px',
      data: this.movies[i].title,
    });
    popup.afterClosed().subscribe(item =>{
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  removeArchive(ind:any,movie:any){
    let obj:any;
    obj = {
      title: movie.title,
      isarchive: 1
    };
    obj = JSON.stringify(obj);;
    this.bms.archiveMovie(obj).subscribe(res=> {
      if(res) {
        this.archivedMovies();
      }
    })
  }

}
