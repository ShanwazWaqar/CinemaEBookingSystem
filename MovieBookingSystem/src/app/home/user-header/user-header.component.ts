import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from '../../services/bmsapi.service';
import {  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  user:any="";
  email:any = '';
  inputForm: FormGroup;
  isVerifiedUser:boolean = true;
  @Output() searchVal = new EventEmitter<string>();
  searchText:string = "";
  homePage:boolean = true;

  constructor(private router: Router, private bms: bmsApiService,private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      inputVal : [''],
    });
   }

  ngOnInit(): void {
    if((this.router.url).includes("userHomePage")) {
      this.homePage = true;
    } else {
      this.homePage = false;
    }
    this.email = (localStorage.getItem("user")); 
    let cred:any = "";
      cred = {
        email: this.email,
      }
      cred = JSON.stringify(cred);
      this.bms.getFirstName(cred).subscribe((res)=>{
        this.user = res.firstname;
      });
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

  search(evt:any) {
    this.searchVal.emit(evt);
  }

  clearSearch() {
    this.searchText = "";
    this.searchVal.emit(this.searchText);
  }

  manageCards() {
    this.router.navigateByUrl('/manageCards');
  }

  
}
