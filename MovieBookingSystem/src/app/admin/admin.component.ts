import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  loginForm: FormGroup;
  adminerror:boolean = false;
  constructor(private fb: FormBuilder,private router: Router) { }

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
    console.log("click")
    this.router.navigateByUrl('/admin2');
  }

}
