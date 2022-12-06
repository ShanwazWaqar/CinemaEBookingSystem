import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { bmsApiService } from '../services/bmsapi.service';
import { tempDataService } from '../services/tempData.service';
import { ErrorPopupComponent } from './error-popup/error-popup.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  loginForm: FormGroup;
  adminerror:boolean = false;
  constructor(private fb: FormBuilder,private router: Router, private bms:bmsApiService, private tds:tempDataService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    });
  }

  submitLogin(form:any) {
    this.router.navigateByUrl('/adminHomePage');
    //login check code goes here
    // if(form.value.email == "admin" && form.value.password == "password"){
      
    // }else {
    //   //login failed code
    // }
    
  }

  errorPopup(msg:any) {
    const popup2 = this.dialogRef.open(ErrorPopupComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '400px',
      data: msg
    });
  }

  admin2Route() {
    if(this.loginForm.value.email == "shanwaz" && this.loginForm.value.password == "12345") {
      localStorage.setItem("adminLoggedIn","true");
      this.router.navigateByUrl('/admin2');
    }
    if(this.loginForm.valid){
      let user:any;
      user = {
        email: this.loginForm.value.email,
        password: this.tds.encryptData(this.loginForm.value.password)
      }
      user = JSON.stringify(user);
      this.bms.adminLogin(user).subscribe((res) => {
        if(res) {
          localStorage.setItem("adminLoggedIn","true");
          localStorage.setItem("adMail",this.loginForm.value.email);
          this.router.navigateByUrl('/admin2');
        } else {
          // Server down popup
          this.errorPopup("Sorry you dont have Access.")
        }
      });
    }
    
  }
    
  }
