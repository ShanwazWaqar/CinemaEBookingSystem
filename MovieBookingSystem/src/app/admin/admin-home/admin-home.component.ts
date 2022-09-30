import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  displayMoviesComp:boolean=false;
  displayUSersComp:boolean=false;
  displayPromosComp:boolean=false;
  displayAdminsComp:boolean=false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.displayMoviesComp = true;
  }

  displayManageMovies() {
    this.displayMoviesComp=true;
    this.displayUSersComp=false;
    this.displayPromosComp=false;
    this.displayAdminsComp=false;
  }

  displayManageUsers() {
    this.displayMoviesComp=false;
    this.displayUSersComp=true;
    this.displayPromosComp=false;
    this.displayAdminsComp=false;
  }

  displayManagePromotions() {
    this.displayMoviesComp=false;
    this.displayUSersComp=false;
    this.displayPromosComp=true;
    this.displayAdminsComp=false;
  }

  displayAdmins(){
    this.displayMoviesComp=false;
    this.displayUSersComp=false;
    this.displayPromosComp=false;
    this.displayAdminsComp=true;
  }

  logout() {
    this.router.navigate(['admin']);
  }

}
