import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupTraierComponent } from '../popup-traier/popup-traier.component';

@Component({
  selector: 'app-synopsis-page',
  templateUrl: './synopsis-page.component.html',
  styleUrls: ['./synopsis-page.component.scss']
})
export class SynopsisPageComponent implements OnInit {

  constructor(private dialogRef: MatDialog,private router: Router) { }

  ngOnInit(): void {
  } 

  openTrailerPopup() {
    let link = 'UaVTIH8mujA';
    const popup = this.dialogRef.open(PopupTraierComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      data: {url : link},
    });
    popup.afterClosed().subscribe(item =>{
      if(item){
        
      }
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  bookTickets() {
    this.router.navigateByUrl('/bookTickets');
  }

}
