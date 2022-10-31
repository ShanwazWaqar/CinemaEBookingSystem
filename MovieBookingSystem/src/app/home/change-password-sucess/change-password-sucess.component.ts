import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-sucess',
  templateUrl: './change-password-sucess.component.html',
  styleUrls: ['./change-password-sucess.component.scss']
})
export class ChangePasswordSucessComponent implements OnInit {

  constructor(private Ref:MatDialogRef<ChangePasswordSucessComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.closePopup();
    }, 4000);
  }

  closePopup() {
    this.Ref.close();
  }

}
