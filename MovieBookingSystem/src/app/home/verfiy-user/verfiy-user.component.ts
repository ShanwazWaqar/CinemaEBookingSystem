import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';
import { tempDataService } from 'src/app/services/tempData.service';

@Component({
  selector: 'app-verfiy-user',
  templateUrl: './verfiy-user.component.html',
  styleUrls: ['./verfiy-user.component.scss']
})
export class VerfiyUserComponent implements OnInit {
  loginForm: FormGroup;
  otpError:boolean = false;
  isValidOTP:boolean = false;
  otpValue:any = "";
  email:any = "";
  resendOTPcheck:boolean = false;
  constructor(private fb: FormBuilder,private router: Router,private _bmsAs:bmsApiService, private dialogRef: MatDialog, private tds: tempDataService) { }

  ngOnInit(): void {
    if(localStorage.getItem("loggedIn") == "false") {
      this.router.navigateByUrl('/home');
    }
    this.email = (localStorage.getItem("user"));
    this.loginForm = this.fb.group({
      email : [{ value: this.email, disabled: true},[Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      otp: ['',[Validators.required]],
      password : ['', [Validators.required]],
      password2 : ['',[Validators.required]]
    });
  }

  verifyOtp() {
    if(this.otpValue.length == 5){
      this.otpError = false;
      this.otpError = false;
      let cred:any = "";
      cred = {
        email: this.email,
        verificationcode: this.otpValue
      }
      cred = JSON.stringify(cred);
      this._bmsAs.verifyOTP(cred).subscribe((res) => {
        if (res) {
          this.router.navigateByUrl('/userHomePage');
        } else {
          this.isValidOTP = true;
        }
      });
    } else {
      this.otpError = true;
    }
  }

  onOtpChange(evt:any) {
    this.otpValue = evt;
    if(this.otpValue.length == 5) {
      this.otpError = false;
    }
  }

  resendOTP() {
    // send otp confirmation
    this.resendOTPcheck = true;
  }

}
