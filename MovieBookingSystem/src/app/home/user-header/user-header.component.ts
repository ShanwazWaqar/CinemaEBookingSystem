import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  @Input() email = '';
  isVerifiedUser:boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editProfile() {
    this.router.navigateByUrl('/editUserProfile');
  }

  logout() {
    localStorage.setItem("loggedIn","false");
    this.router.navigateByUrl('/Login');
  }

  changePassword() {
    this.router.navigateByUrl('/changePassword');
  }

  verifyUser() {
    this.router.navigateByUrl('/verifyUser');
  }

}
