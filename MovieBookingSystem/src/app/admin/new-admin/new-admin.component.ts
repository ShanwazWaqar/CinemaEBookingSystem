import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {

  displayManageUsersbtn:boolean=true;

  displayMoviesComp:boolean=false;
  displayUSersComp:boolean=false;
  displayPromosComp:boolean=false;
  displayAdminsComp:boolean=false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!localStorage.getItem("adminLoggedIn")) {
      this.router.navigate(['admin']);
    }
    this.displayUSersComp = true;
  }

  displayManageMovies() {
    console.log("Manage Movies");
    this.displayMoviesComp=true;
    this.displayUSersComp=false;
    this.displayPromosComp=false;
    this.displayAdminsComp=false;
  }

  displayManageUsers() {
    console.log("Manage Users");
    this.displayMoviesComp=false;
    this.displayUSersComp=true;
    this.displayPromosComp=false;
    this.displayAdminsComp=false;
  }

  displayManagePromotions() {
    console.log("Manage Promotions");
    this.displayMoviesComp=false;
    this.displayUSersComp=false;
    this.displayPromosComp=true;
    this.displayAdminsComp=false;
  }

  displayAdmins(){
    console.log("Manage Admins");
    this.displayMoviesComp=false;
    this.displayUSersComp=false;
    this.displayPromosComp=false;
    this.displayAdminsComp=true;
  }

  logout() {
    localStorage.setItem("adminLoggedIn","false");
    this.router.navigate(['admin']);
  }
}
