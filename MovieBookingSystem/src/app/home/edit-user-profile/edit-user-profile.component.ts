import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bmsApiService } from '../../services/bmsapi.service';
import { tempDataService } from '../../services/tempData.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  cardDetails:boolean = false;
  data:any="";
  email:any = "";
  updateForm : FormGroup;
  promotionValue:string = "Register Up For Promotions";
  promotionOptedIn: boolean = false;
  addressForm:FormGroup
  cardForm: FormGroup;
  showAddressDetails:boolean=false;
  addressStatus:any = "ADD ADDRESS"
  constructor(private activatedroute:ActivatedRoute, private router: Router, private fb: FormBuilder, private _bmsAs: bmsApiService, private tds: tempDataService) {
      
   }
  ngOnInit(): void {
    if(localStorage.getItem("loggedIn") == "false") {
      this.router.navigateByUrl('/home');
    }
    this.email = (localStorage.getItem("user"));
    this.updateForm = this.fb.group({
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      email : [{ value: this.email, disabled: true},[]],
      phone : ['',[Validators.required,]],
    });

    this.addressForm = this.fb.group({
      address1 : ['',[Validators.required]],
      address2 : ['',[]],
      city : ['',[Validators.required]],
      state : ['',[Validators.required]],
      country : ['',[Validators.required]],
      pincode : ['',[Validators.required, Validators.pattern("^[a-zA-Z0-9]{5}$")]],
    });
    
    this.cardForm = this.fb.group({
      cardNo : ['',[Validators.required]],
      month : ['',[Validators.required,Validators.pattern('^[0-9]{2}$')]],
      year : ['',[Validators.required,Validators.pattern('^[0-9]{4}$')]],
      name : ['',[Validators.required]],
    });
    
    let cred:any = "";
      cred = {
        email: this.email
      }
      cred = JSON.stringify(cred);
      this._bmsAs.getUserData(cred).subscribe((res) => {
        console.log(res," res");
        this.updateForm.patchValue({
          fullName: res.fullname,
          phone: res.phone,
          address1: res.address1,
          address2: res.address2,
          city: res.city,
          state: res.state,
          country: res.country,
          pincode: res.zipcode
        });
        if(res.address1 == null) {
            this.addressStatus = "ADD ADDRESS"
        }
        
      });    
  }

  showAddAddress() {
    this.showAddressDetails = !this.showAddressDetails;
    this.addressForm.reset();
  }

  updateProfile() {
    this.updateForm.markAllAsTouched();
    if(this.showAddressDetails){
      this.addressForm.markAllAsTouched();
    }
    if(this.cardDetails){
      this.cardForm.markAllAsTouched();
    }
    var user:any;
    user = {
      firtname : this.updateForm.value.firtName,
      lastname : this.updateForm.value.lastName,
      email : this.updateForm.value.email,
      phone : this.updateForm.value.phone,
      address1 : this.addressForm.value.address1,
      address2 : this.addressForm.value.address2,
      city : this.addressForm.value.city,
      state : this.addressForm.value.state,
      country : this.addressForm.value.country,
      zipcode : this.addressForm.value.pincode,
      cardNo : this.cardForm.value.cardNo,
      month : this.cardForm.value.month,
      year : this.cardForm.value.year,
      name: this.cardForm.value.name,
      promotion: this.promotionOptedIn
    }
    let a = true;
    if(this.updateForm.valid){
      if((this.showAddressDetails && this.addressForm.valid) || (this.showAddressDetails == false) ) {
        if((this.cardDetails && this.cardForm.valid) || (this.cardDetails == false)) {
          console.log(user," User");
          //API for registration 
          // user = JSON.stringify(user);
          // this._bmsAs.registerUser(user).subscribe((res) => {
          //   console.log(JSON.stringify(res)," res");
          //   if(res) {
          //     this.openDialog();
          //   } else {
          //     // Server down popup
          //   }
          // });
          console.log("valid");
          a=false;
        }
      }
    }
    if(a){
      console.log("invalid")
    }
  }

  showCardDetails() {
    this.cardDetails = !this.cardDetails;
    this.cardForm.reset();
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

}
