import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-popup-traier',
  templateUrl: './popup-traier.component.html',
  styleUrls: ['./popup-traier.component.scss']
})
export class PopupTraierComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private Ref:MatDialogRef<PopupTraierComponent>,private bms: bmsApiService) { 
    console.log(data," yooutube link in popup")
  }
  playerConfig = {
    
    autoplay: 1
  };
  apiLoaded = false;

  ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  closePopup() {
    this.Ref.close();
  }

  }
