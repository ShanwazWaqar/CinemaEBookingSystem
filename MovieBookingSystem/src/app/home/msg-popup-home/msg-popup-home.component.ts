import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-msg-popup-home',
  templateUrl: './msg-popup-home.component.html',
  styleUrls: ['./msg-popup-home.component.scss']
})
export class MsgPopupHomeComponent implements OnInit {
  msg:any = "";
  constructor(private Ref:MatDialogRef<MsgPopupHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private readonly changeDetectorRef: ChangeDetectorRef) {
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
