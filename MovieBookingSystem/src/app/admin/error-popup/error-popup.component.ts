import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {
  msg:any = "";
  constructor(private Ref:MatDialogRef<ErrorPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private readonly changeDetectorRef: ChangeDetectorRef) {
    this.msg = data;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.closePopup();
    }, 3000);
  }

  closePopup() {
    this.Ref.close();
  }

}
