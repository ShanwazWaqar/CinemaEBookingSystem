import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from '../../services/bmsapi.service'; 
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ResetPassSuccessComponent } from '../reset-pass-success/reset-pass-success.component';
import { tempDataService } from '../../services/tempData.service';
// import { NgOtpInputComponent } from '';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  emailError:boolean = false;
  resetBtn:boolean = true;
  isEmailDsiabled:boolean = false;
  isValidOTP:boolean = false;
  showOtp:boolean = false;
  showPasswordError:boolean = false;
  showChangePassword:boolean = false;
  otpValue:any = "";
  otpError:boolean = false;
  initialPwdError:boolean = false;
  passwordError:boolean = false;
  currentEmail:any="";
  constructor(private fb: FormBuilder,private router: Router,private _bmsAs:bmsApiService, private dialogRef: MatDialog, private tds:tempDataService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['',[Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      otp: ['',[Validators.required]],
      password : ['', [Validators.required]],
      password2 : ['',[Validators.required]]
    });
  }

  sendResetLink(){
    let cred:any = "";
      cred = {
        email: this.loginForm.value.email
      }
      this.currentEmail = this.loginForm.value.email;
      cred = JSON.stringify(cred);
      this._bmsAs.forgotPasswordEmail(cred).subscribe((res) => {
        if (res) {
          this.resetBtn = false;
          this.showOtp = true;
          this.loginForm.controls['email'].disable();
        } else {
          //invalid email
          
        }
      });
  }
  
  verifyOtp() {
    
    //http call to check for same otp
    // this.isValidOTP=true;
    if(this.otpValue.length == 5){
      
      let cred:any = "";
      console.log(this.currentEmail," emil ")
      cred = {
        email: this.currentEmail,
        passvercode: this.otpValue
      }
      cred = JSON.stringify(cred);
      console.log(cred);
      this._bmsAs.forgotPasswordOTP(cred).subscribe((res) => {
        if (res) {
          this.resetBtn = false;
          this.isValidOTP = true;
          this.showOtp = false;
          this.showChangePassword = true;
          this.otpError = false;
        } else {
          
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

  checkPassword(str1:any,str2:any){
    if(str1 == str2){
      return true;
    }else {
      return false;
    }
  }

  changePassword() {
    this.showPasswordError = true;
    this.openDialog();
    this.loginForm.patchValue({
      email: this.currentEmail,
      otp: "12345",
    });
    console.log("login form", this.loginForm.value);
    if(this.loginForm.valid) {
      let cred:any = "";
      cred = {
        email: this.currentEmail,
        password: this.tds.encryptData(this.loginForm.value.password)
      }
      console.log(" cred passing to change password");
      cred = JSON.stringify(cred);
      console.log(cred);
      this._bmsAs.updateforgotPassword(cred).subscribe((res) => {
        if (res) {
          this.resetBtn = false;
          this.isValidOTP = true;
          this.showOtp = false;
          this.showChangePassword = true;
          this.otpError = false;
          this.openDialog();
        } else {
          //for invalid cred
        }
      });
    }
  }

  openDialog() {
    const popup = this.dialogRef.open(ResetPassSuccessComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1200ms',
      height: '250px',
      width: '400px',
    });
    popup.afterClosed().subscribe(item =>{
      this.router.navigateByUrl('/Login');
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  passwordCheck() {
    let pwd1 = this.loginForm.value.password;
    let pwd2 = this.loginForm.value.password2;
    if(pwd2 != '') {
      if(pwd1 == pwd2) {
        this.initialPwdError = false;
        this.passwordError = false;
      }else {
        this.initialPwdError = true;
      }
    } 
  }
  passwordCheck2() {
    let pwd1 = this.loginForm.value.password;
    let pwd2 = this.loginForm.value.password2;
    if(pwd1 != '') { 
      if(pwd1 == pwd2) {
        this.passwordError = false;
        this.initialPwdError = false;
      }else {
        this.passwordError = true;
      }
    }
  }

}
