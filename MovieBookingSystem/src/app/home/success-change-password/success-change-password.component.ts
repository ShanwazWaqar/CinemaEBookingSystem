import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-success-change-password',
  templateUrl: './success-change-password.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./success-change-password.component.scss']
})
export class SuccessChangePasswordComponent implements OnInit {

  constructor(private Ref:MatDialogRef<SuccessChangePasswordComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.closeModal();
    }, 3000);
  }

  closeModal(){
    this.Ref.close();
  }

}
