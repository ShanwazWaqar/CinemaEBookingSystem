import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from '../../services/bmsapi.service'; 
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ResetPassSuccessComponent } from '../reset-pass-success/reset-pass-success.component';
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
  constructor(private fb: FormBuilder,private router: Router,private _bmsAs:bmsApiService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['',[Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      otp: ['',[Validators.required]]
    });
  }

  sendResetLink(){
    this.resetBtn = false;
    this.showOtp = true;
    this.loginForm.controls['email'].disable();
  }
  
  verifyOtp() {
    this.resetBtn = false;
    this.isValidOTP = true;
    this.showOtp = false;
    this.showChangePassword = true
    //http call to check for same otp
    // this.isValidOTP=true;
    
  }

  onOtpChange(evt:any) {
    console.log(evt," evet ")
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

}
