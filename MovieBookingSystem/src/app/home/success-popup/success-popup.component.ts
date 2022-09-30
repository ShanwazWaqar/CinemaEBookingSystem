import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent implements OnInit {

  constructor(private Ref:MatDialogRef<SuccessPopupComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.closePopup();
    }, 4000);
  }

  closePopup() {
    this.Ref.close();
  }

}
