import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bmsApiService } from '../../services/bmsapi.service';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { RegistrationSuccessComponent } from '../registration-success/registration-success.component';
import { tempDataService } from '../../services/tempData.service';

@Component({
  selector: 'app-sign-up2',
  templateUrl: './sign-up2.component.html',
  styleUrls: ['./sign-up2.component.scss']
})
export class SignUp2Component implements OnInit {
  signUpForm: FormGroup;
  addressForm: FormGroup;
  cardForm: FormGroup;
  cardDetails:boolean = false;
  showAddressDetails:boolean = false;
  promotionValue:string = "Sign Up For Promotions";
  passwordError:boolean = false;
  promotionOptedIn:boolean = false;
  initialPwdError:boolean = false;
  constructor(private fb: FormBuilder,private router: Router,private _bmsAs:bmsApiService, private dialogRef: MatDialog, private tds: tempDataService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firtName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      email : ['',[Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone : ['',[Validators.required,]],
      password : ['', [Validators.required]],
      password2 : ['',[Validators.required]]
    });
    this.addressForm = this.fb.group({
      address1 : ['',[Validators.required]],
      address2 : ['',[Validators.required]],
      city : ['',[Validators.required]],
      state : ['',[Validators.required]],
      country : ['',[Validators.required]],
      pincode : ['',[Validators.required, Validators.pattern("^[a-zA-Z0-9]{5}$")]],
    });
    this.cardForm = this.fb.group({
      cardNo : ['',[Validators.required]],
      month : ['',[Validators.required,Validators.pattern('^[0-9]{0,1}[0-9]{1}$')]],
      year : ['',[Validators.required,Validators.pattern('^[0-9]{4}$')]],
      name : ['',[Validators.required]],
    });
  }

  signUp() {
    var user:any;
    user = {
      firtname : this.signUpForm.value.firtName,
      lastname : this.signUpForm.value.lastName,
      email : this.signUpForm.value.email,
      phone : this.signUpForm.value.phone,
      password : this.tds.encryptData(this.signUpForm.value.password),
      address1 : this.addressForm.value.address1,
      address2 : this.addressForm.value.address2,
      city : this.addressForm.value.city,
      state : this.addressForm.value.state,
      country : this.addressForm.value.country,
      zipcode : this.addressForm.value.pincode,
      cardnumber : this.cardForm.value.cardNo,
      cardexpirymonth : this.cardForm.value.month,
      cardexpiryyear : this.cardForm.value.year,
      nameoncard: this.cardForm.value.name,
      promotion: this.promotionOptedIn
    }
    this.signUpForm.markAllAsTouched();
    if(this.showAddressDetails){
      this.addressForm.markAllAsTouched();
    }
    if(this.cardDetails){
      this.cardForm.markAllAsTouched();
    }
    if(this.signUpForm.valid){
      if((this.showAddressDetails && this.addressForm.valid) || (this.showAddressDetails == false) ) {
        if((this.cardDetails && this.cardForm.valid) || (this.cardDetails == false)) {
          //API for registration 
          user = JSON.stringify(user);
          this._bmsAs.registerUser(user).subscribe((res) => {
            console.log(JSON.stringify(res)," res");
            if(res) {
              this.openDialog();
            } else {
              // Server down popup
            }
          });
        }
      }
    }
    // if(this.showAddressDetails){
    //   console.log(this.addressForm.value," Address Form values");
    // }
    // if(this.cardDetails) {
    //   console.log(this.cardForm.value," Card details values");    
    // }
    // this.router.navigateByUrl('/userHomePage');
  }

  openDialog() {
    const popup = this.dialogRef.open(RegistrationSuccessComponent, {
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

  showCardDetails() {
    this.cardDetails = !this.cardDetails;
    this.cardForm.reset();
  }
  showAddAddress() {
    this.showAddressDetails = !this.showAddressDetails;
    this.addressForm.reset();
  }
  signUpPromotions() {
    if(this.promotionValue == "Sign Up For Promotions") {
      this.promotionValue = "Thank you for Signing Up For Promotions";
      this.promotionOptedIn = true;
    } else {
      this.promotionValue = "Sign Up For Promotions";
      this.promotionOptedIn = false;
    }
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
