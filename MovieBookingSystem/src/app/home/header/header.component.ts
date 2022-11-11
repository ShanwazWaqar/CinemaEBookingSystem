import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchText:string = "";
  @Output() searchVal = new EventEmitter<string>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signUpReRoute() {
    this.router.navigateByUrl('/SignUp');
  }

  loginReroute() {
    this.router.navigateByUrl('/Login');
  }

  search(evt:any) {
    this.searchVal.emit(evt);
  }

  clearSearch() {
    console.log("clear called")
    this.searchText = "";
    this.searchVal.emit(this.searchText);
  }

}
