import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-movie',
  templateUrl: './schedule-movie.component.html',
  styleUrls: ['./schedule-movie.component.scss']
})
export class ScheduleMovieComponent implements OnInit {
  screens = [
    {
      screenName : 1,
      isSelected: false
    },
    {
      screenName : 2,
      isSelected: false
    },
    {
      screenName : 3,
      isSelected: false
    },
    {
      screenName : 4,
      isSelected: false
    },
    {
      screenName : 5,
      isSelected: false
    },
    {
      screenName : 6,
      isSelected: false
    },
  ];
  movieName:any = "";
  stepHour =1;
  stepMinute =1;
  touchUi = true;
  disableMinute = false;
  hideTime = false;
  enableMeridian=true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private Ref:MatDialogRef<ScheduleMovieComponent>) {
    this.movieName = data.movieName;
   }

  ngOnInit(): void {
  }

  cancelScheduleMovie(){
    this.Ref.close();
  }

  ScheduleMovie() {
    //schedule code goes here 
    this.Ref.close();
  }

  selectScreen(ind:any) {
    for(let i=0;i<this.screens.length;i++)
    {
      if(i==ind){
        this.screens[i].isSelected = true;
      }else {
        this.screens[i].isSelected = false;
      }
    }  
}
  

}
