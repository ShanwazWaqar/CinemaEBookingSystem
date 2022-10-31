import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { bmsApiService } from '../../services/bmsapi.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  email:any = '';
  isVerifiedUser:boolean = true;

  constructor(private router: Router, private bms: bmsApiService) { }

  ngOnInit(): void {
    this.email = (localStorage.getItem("user")); 
    let cred:any = "";
      cred = {
        email: this.email,
      }
      cred = JSON.stringify(cred);
      this.bms.verfiedUser(cred).subscribe((res) => {
        if (res) {
          this.isVerifiedUser = false;
        } else {
          this.isVerifiedUser = true;
        }
      });
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
