import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from '../services/bmsapi.service';
import { tempDataService } from '../services/tempData.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  loginForm: FormGroup;
  adminerror:boolean = false;
  constructor(private fb: FormBuilder,private router: Router, private bms:bmsApiService, private tds:tempDataService) { }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['', [Validators.required]]
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

  admin2Route() {
    if(this.loginForm.valid){
      let user:any;
      user = {
        email: this.loginForm.value.email,
        password: this.tds.encryptData(this.loginForm.value.password)
      }
      user = JSON.stringify(user);
      console.log(user," user");
      this.bms.adminLogin(user).subscribe((res) => {
        if(res) {
          this.router.navigateByUrl('/admin2');
        } else {
          // Server down popup
        }
      });
    }
    
  }
    
  }
