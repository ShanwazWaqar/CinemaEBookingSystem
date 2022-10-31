import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from '../../services/bmsapi.service';
import { tempDataService } from '../../services/tempData.service';

@Component({
  selector: 'app-admin-reg',
  templateUrl: './admin-reg.component.html',
  styleUrls: ['./admin-reg.component.scss']
})
export class AdminRegComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,private router: Router,private bms:bmsApiService,private tds: tempDataService) { }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['', [Validators.required]]
    });
  }

  submitLogin(form:any) {
    this.router.navigateByUrl('/admin');
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
        passowrd: this.tds.encryptData(this.loginForm.value.passowrd)
      }
      user = JSON.stringify(user);
      this.bms.adminReg(user).subscribe((res) => {
        console.log(JSON.stringify(res)," res");
        if(res) {
          this.router.navigateByUrl('/admin');
        } else {
          // Server down popup
        }
      });
    }
    
  }

}
