import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-traier',
  templateUrl: './popup-traier.component.html',
  styleUrls: ['./popup-traier.component.scss']
})
export class PopupTraierComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private Ref:MatDialogRef<PopupTraierComponent>) { 
    console.log(data," yooutube link in popup")
  }

  ngOnInit(): void {
  }

}
