import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-pass-success',
  templateUrl: './reset-pass-success.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./reset-pass-success.component.scss']
})
export class ResetPassSuccessComponent implements OnInit {

  constructor(private Ref:MatDialogRef<ResetPassSuccessComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.closeModal();
    }, 3000);
  }

  closeModal(){
    this.Ref.close();
  }

}
