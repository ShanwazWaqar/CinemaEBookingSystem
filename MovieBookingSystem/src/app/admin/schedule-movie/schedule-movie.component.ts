import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { bmsApiService } from 'src/app/services/bmsapi.service';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { MsgPopupComponent } from '../msg-popup/msg-popup.component';

@Component({
  selector: 'app-schedule-movie',
  templateUrl: './schedule-movie.component.html',
  styleUrls: ['./schedule-movie.component.scss']
})
export class ScheduleMovieComponent implements OnInit {
  datetime: any;
  pastDate: any;
  selectedScreen: number;
  selected:any = "";
  todayDate:Date = new Date();
  timings: any = [
    "11:00 AM",
    "02:00 PM",
    "05:30 PM",
    "09:30 PM",
  ];
  screens = [
    {
      screenName: 1,
      isSelected: false
    },
    {
      screenName: 2,
      isSelected: false
    },
    {
      screenName: 3,
      isSelected: false
    },
    {
      screenName: 4,
      isSelected: false
    },
    {
      screenName: 5,
      isSelected: false
    },
    {
      screenName: 6,
      isSelected: false
    },
  ];
  movieName: any = "";
  stepHour = 1;
  stepMinute = 1;
  touchUi = true;
  disableMinute = false;
  hideTime = false;
  enableMeridian = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialog, private Ref: MatDialogRef<ScheduleMovieComponent>, private bms: bmsApiService) {
    this.movieName = data;
  }

  ngOnInit(): void {
  }



  cancelScheduleMovie() {
    this.Ref.close();
  }
  senddate(event: any) {
    this.datetime = this.convert(event.value)
  }


  ScheduleMovie() {
    //schedule code goes here 
    let obj: any
    obj = {
      moviename: this.movieName,
      date: this.datetime,
      time: this.selected,
      showroomid: this.selectedScreen
    }
    obj = JSON.stringify(obj);
    this.bms.scheduleMovie(obj).subscribe((res) => {
      if (res) {
        this.sucessPopup(this.movieName+" scheduled successfully on "+this.datetime+" at "+this.selected+".")
      } else {
        const popup2 = this.dialogRef.open(ErrorPopupComponent, {
          disableClose: true,
          enterAnimationDuration: '700ms',
          exitAnimationDuration:'1000ms',
          maxHeight: '80vh',
          width: '400px',
          data: "Show Room is already occupied."
        });
      }
    })
    this.Ref.close();
  }

  

  sucessPopup(msg:any) {
    const popup2 = this.dialogRef.open(MsgPopupComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '500px',
      data: msg
    });
  }

  selectScreen(ind: any) {
    this.selectedScreen = (ind + 1);
    console.log(this.selectedScreen, " selected Screen");
    for (let i = 0; i < this.screens.length; i++) {
      if (i == ind) {
        this.screens[i].isSelected = true;
      } else {
        this.screens[i].isSelected = false;
      }
    }
  }
  convert(value: any) {
    var date = new Date(value),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


}
