import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-book-seats',
  templateUrl: './book-seats.component.html',
  styleUrls: ['./book-seats.component.scss']
})
export class BookSeatsComponent implements OnInit {

  seatRows: any = [];
  selectedSeats = [];
  noOfSelected: number = 0;
  cnt: number = 0;
  listSelected:any = [];
  movie:any;
  email:any;
  seatOccupied:any;
  constructor(private router: Router, private bms: bmsApiService, private route:ActivatedRoute) {
  }


  ngOnInit(): void {
    this.email = (localStorage.getItem("user"));
    this.movie = (localStorage.getItem("movie"));
    this.movie = JSON.parse(this.movie);
    this.seatRows = [];
    this.loadSeats();
    let obj:any;
    obj = {
      time : this.movie.movieTime,
      date: this.movie.movieDate,
      screennumber : this.movie.screen
    };
    obj = JSON.stringify(obj);
    this.bms.getseats(obj).subscribe(res=> {
      if(res) {
        this.seatOccupied = res;
        for(let i=0;i<this.seatOccupied.length;i++) {
          for(let j=0;j<this.seatRows.length;j++) {
            for(let k = 0;k<this.seatRows[i].length;k++) {
              if(this.seatRows[j][k].label == this.seatOccupied[i].seatnumber) {
                this.seatRows[j][k].selected = 1;
                break;
              }
            }
          }
        }
      }
    });
  }

  loadSeats() {
    for (let i = 0; i < 7; i++) {
      let tempArr = [];
      for (let j = 0; j < 13; j++) {
        let ch = 'A';
        let obj = {
          label: String.fromCharCode(ch.charCodeAt(0) + i) + (j + 1),
          selected: 0,
          currentSelected: false
        }
        tempArr.push(obj);
      }
      this.seatRows.push(tempArr);
    };
  }

  addSpace(row: any) {
    if (row.selected != 1) {
      let check = (row + "").slice(1);
      if (check == "4" || check == "9") {
        return true;
      }             
      return false;
    }
  }

  updateSeatSelection(seat: any, evt: any) {
    if (seat.selected != 1) {
      if(!seat.currentSelected) {
        this.listSelected.push(seat);  
        this.noOfSelected = this.noOfSelected + 1;
      } else {
        for(let i=0; i<this.listSelected.length;i++) {
          if(this.listSelected[i].label == seat.label) {
            this.listSelected.splice(i,1);
          }
        }
        this.noOfSelected = this.noOfSelected - 1;
       }
      seat.currentSelected = !seat.currentSelected;  
    }
  }

  ageSelection() {
    let selectedSeatsList:any = [];
    for(let i=0;i<this.listSelected.length;i++) {
      selectedSeatsList.push(this.listSelected[i].label)
    }
    this.movie.selectedSeatsList = selectedSeatsList;
    localStorage.setItem("movie",JSON.stringify(this.movie));
    // this.router.navigateByUrl('/selectAges');
  }

}
