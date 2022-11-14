import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-msg-popup',
  templateUrl: './msg-popup.component.html',
  styleUrls: ['./msg-popup.component.scss']
})
export class MsgPopupComponent implements OnInit {
  msg:any = "";
  constructor(private Ref:MatDialogRef<MsgPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private readonly changeDetectorRef: ChangeDetectorRef) {
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
