import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editprofile-success',
  templateUrl: './editprofile-success.component.html',
  styleUrls: ['./editprofile-success.component.scss']
})
export class EditprofileSuccessComponent implements OnInit {

  constructor(private Ref:MatDialogRef<EditprofileSuccessComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.closePopup();
    }, 3000);
  }

  closePopup() {
    this.Ref.close();
  }

}
