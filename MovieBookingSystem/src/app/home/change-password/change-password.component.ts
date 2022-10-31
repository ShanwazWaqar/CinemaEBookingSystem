import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from '../../services/bmsapi.service'; 
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { SuccessChangePasswordComponent } from '../success-change-password/success-change-password.component';
import { tempDataService } from '../../services/tempData.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  signUpForm: FormGroup;
  initialPwdError:boolean = false;
  passwordError:boolean = false;
  email:any = "";
  invalidPassword:boolean=false;
  constructor(private fb: FormBuilder,private router: Router,private _bmsAs:bmsApiService, private dialogRef: MatDialog,private tds:tempDataService) { }

  ngOnInit(): void {
    if(localStorage.getItem("loggedIn") == "false") {
      this.router.navigateByUrl('/home');
    }
    this.email = (localStorage.getItem("user")); 
    this.signUpForm = this.fb.group({
      existingPassword : ['', [Validators.required]],
      password : ['', [Validators.required]],
      password2 : ['',[Validators.required]]
    });
  }

  passwordCheck() {
    let pwd1 = this.signUpForm.value.password;
    let pwd2 = this.signUpForm.value.password2;
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
    let pwd1 = this.signUpForm.value.password;
    let pwd2 = this.signUpForm.value.password2;
    if(pwd1 != '') { 
      if(pwd1 == pwd2) {
        this.passwordError = false;
        this.initialPwdError = false;
      }else {
        this.passwordError = true;
      }
    }
  }

  changePassword() {
    this.signUpForm.markAllAsTouched();
    if(this.signUpForm.valid && !this.initialPwdError && !this.passwordError){
      //api call and upon success
      let cred:any = "";
      cred = {
        email: this.email,
        password : this.tds.encryptData(this.signUpForm.value.existingPassword),
        updatedpass :this.tds.encryptData(this.signUpForm.value.password)
      }
      cred = JSON.stringify(cred);
      this._bmsAs.changePassword(cred).subscribe((res) => {
        if (res) {
          this.openDialog();
          this.router.navigateByUrl('/userHomePage');
        } else {
          //for invalid cred
          this.invalidPassword = true;
        }
      });
    } else {
      
      console.log("invalid form")
    }
  }

  openDialog() {
    const popup = this.dialogRef.open(SuccessChangePasswordComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1200ms',
      height: '250px',
      width: '400px',
    });
    popup.afterClosed().subscribe(item =>{
      // this.router.navigateByUrl('/Login');
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

}
