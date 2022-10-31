import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from '../../services/bmsapi.service';
import { tempDataService } from '../../services/tempData.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailError: boolean = false;
  passwordFieldError: boolean = false;
  encryptSecretKey: string = "randomKey";
  constructor(private fb: FormBuilder, private router: Router, private _bmsAs: bmsApiService, private tds: tempDataService) { }

  ngOnInit(): void {
    console.log(this.tds.encryptData("qwerty"));
    console.log(this.tds.encryptData("qwerty"));
    console.log(this.tds.encryptData("qwerty"));
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    });
    if (localStorage.getItem("UserName") != null) {
      this.loginForm.patchValue({
        email: localStorage.getItem("UserName"),
        password: localStorage.getItem("Password")
      });
    }
  }

  validityCheck() {
    if (this.loginForm.value.email == "" || this.loginForm.value.password == "") {
      if (this.loginForm.value.email == "") {
        this.emailError = true;
      } else {
        this.emailError = false;
      }
      if (this.loginForm.value.password == "") {
        this.passwordFieldError = true;
      } else {
        this.passwordFieldError = false;
      }
      return false;
    }
    return true;
  }

  forgotPasscoode() {
    console.log("forgot passcode");
    this.router.navigateByUrl('/forgotPassword');
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      //remember Me 
      const checkbox = document.getElementById('rememberMe',) as HTMLInputElement | null;

      if (checkbox?.checked) {
        let uname = this.loginForm.value.email;
        let password = this.loginForm.value.password;
        localStorage.setItem("UserName", uname);
        localStorage.setItem("Password", password);
      } 
      //http call
      let cred:any = "";
      cred = {
        "email": this.loginForm.value.email,
        "password": this.tds.encryptData(this.loginForm.value.password)
      }
      cred = JSON.stringify(cred);
      this._bmsAs.validateUser(cred).subscribe(res => {
        if (res) {
          // add code to display valid credentials
          localStorage.setItem("loggedIn","true");
          let edata = this.loginForm.value.email;
          localStorage.setItem("user", edata!);
          let ddata = this.tds.decryptData(localStorage.getItem("user"));
          this.router.navigateByUrl('/userHomePage');
        } else {
          //for invalid cred
        }
      });
      
    } else {
      console.log("invalid form");
    }
  }

}
