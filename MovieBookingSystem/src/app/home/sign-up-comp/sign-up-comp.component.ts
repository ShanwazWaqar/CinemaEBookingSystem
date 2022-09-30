import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';

@Component({
  selector: 'app-sign-up-comp',
  templateUrl: './sign-up-comp.component.html',
  styleUrls: ['./sign-up-comp.component.scss']
})
export class SignUpCompComponent implements OnInit {
  intialPage:boolean = true;
  secondPage:boolean = false;
  thirdPage:boolean = false;
  fourthPage:boolean = false;
  constructor(private dialogRef: MatDialog,private router: Router) { }

  ngOnInit(): void {
  }

  initalPage() {
    this.intialPage = true;
    this.secondPage = false;
    this.thirdPage = false;
    this.fourthPage = false;
  }

  secondPageOfRegistration() {
    this.intialPage = false;
    this.secondPage = true;
    this.thirdPage = false;
    this.fourthPage = false;
  }

  thirdPageOfRegistration() {
    this.intialPage = false;
    this.secondPage = false;
    this.thirdPage = true;
    this.fourthPage = false;
  }

  fourthPageOfRegistration() {
    this.intialPage = false;
    this.secondPage = false;
    this.thirdPage = false;
    this.fourthPage = true;
  }

  register() {
    const popup = this.dialogRef.open(SuccessPopupComponent, {
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
    });
    popup.afterClosed().subscribe(item =>{
      this.router.navigateByUrl('/Login');
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

}
