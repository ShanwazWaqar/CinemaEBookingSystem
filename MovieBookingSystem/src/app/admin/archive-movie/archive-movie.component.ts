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
  // movies = [
  //   {
  //     movieName : "Baby Driver",
  //     archive : "Baby Driver",
  //     Schedule : "ShanwazKotekanti@gmail.com",
  //     update : ""
  //   },
  //   {
  //     firstname : "Naveen",
  //     lastName : "Kurra",
  //     gmail : "naveenKurra@gmail.com",
  //     movieName : "Bohemain",
  //   },
  //   {
  //     firstname : "punith",
  //     lastName : "kandula",
  //     gmail : "punithkandula@gmail.com",
  //     movieName : "Black Adam",
  //   },
  //   // {
  //   //   firstname : "raymond",
  //   //   lastName : "feckoury",
  //   //   gmail : "raymondFeckoury@gmail.com",
  //   //   movieName : "West Side Story",
  //   // },
  //   // {
  //   //   firstname : "raymond",
  //   //   lastName : "feckoury",
  //   //   gmail : "raymondFeckoury@gmail.com",
  //   //   movieName : "The God Father",
  //   // },
  //   // {
  //   //   firstname : "raymond",
  //   //   lastName : "feckoury",
  //   //   gmail : "raymondFeckoury@gmail.com",
  //   //   movieName : "HangOver II",
  //   // },
  //   {
  //     firstname : "raymond",
  //     lastName : "feckoury",
  //     gmail : "raymondFeckoury@gmail.com",
  //     movieName : "Alita",
  //   },
  //   {
  //     firstname : "raymond",
  //     lastName : "feckoury",
  //     gmail : "raymondFeckoury@gmail.com",
  //     movieName : "Suicide Squad",
  //   },
  //   {
  //     firstname : "raymond",
  //     lastName : "feckoury",
  //     gmail : "raymondFeckoury@gmail.com",
  //     movieName : "Joy",
  //   },
  //   {
  //     firstname : "raymond",
  //     lastName : "feckoury",
  //     gmail : "raymondFeckoury@gmail.com",
  //     movieName : "Drive",
  //   },
  // ];

  constructor(private dialogRef: MatDialog,private bms: bmsApiService) { }

  ngOnInit(): void {
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

  removeArchive(ind:any){
    this.movies.splice(ind,1);
  }

}
