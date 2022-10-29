import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  signUpForm: FormGroup;
  initialPwdError:boolean = false;
  passwordError:boolean = false;
  

  constructor(private fb: FormBuilder,private router: Router,private _bmsAs:bmsApiService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fullName : ['',[Validators.required]],
      email : ['',[Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone : ['',[Validators.required,]],
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

}
