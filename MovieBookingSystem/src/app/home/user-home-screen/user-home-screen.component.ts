import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tempDataService } from '../../services/tempData.service';

@Component({
  selector: 'app-user-home-screen',
  templateUrl: './user-home-screen.component.html',
  styleUrls: ['./user-home-screen.component.scss']
})
export class UserHomeScreenComponent implements OnInit {
  searchText = "";
  constructor(private tds: tempDataService, private router: Router) { }

  ngOnInit(): void {
    if(this.tds.checkUser()) {

    }else {
      this.router.navigateByUrl("/home");
    }
  }

  search(evt:any) {
    this.searchText = evt;
  }

}
