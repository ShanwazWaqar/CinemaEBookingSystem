import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.seatRows = [];
    this.loadSeats();
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
    }
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
    console.log(this.listSelected," listSelected");
    // this.router.navigateByUrl('/selectAges');
  }

}
