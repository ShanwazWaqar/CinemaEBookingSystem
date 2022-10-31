import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bmsApiService } from '../../services/bmsapi.service';
import { tempDataService } from '../../services/tempData.service';
import { EditprofileSuccessComponent } from '../editprofile-success/editprofile-success.component';
import { MatDialog } from '@angular/material/dialog';

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
  addressStatus:any = "ADD ADDRESS";
  CardStatusValue = "ADD CARD"
  constructor(private activatedroute:ActivatedRoute, private router: Router, private fb: FormBuilder, private _bmsAs: bmsApiService, private tds: tempDataService,private dialogRef: MatDialog) {
      
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
          firstName: res.firstname,
          lastName: res.lastname,
          phone: res.phone,
        });
        this.addressForm.patchValue({
          address1: res.address1,
          address2: res.address2,
          city: res.city,
          state: res.state,
          country: res.country,
          pincode: res.zipcode,
        });
        console.log(this.addressForm.value," address form value")
        this.cardForm.patchValue({
          cardNo : res.cardnumber,
          month : res.cardexpirymonth,
          year :res.cardexpiryyear,
          name : res.nameoncard,
        });
        if(res.address1 == "") {
            this.addressStatus = "ADD ADDRESS";
        }else {
          this.addressStatus = "UPDATE ADDRESS";
        }
        if(res.cardnumber == null) {
          this.CardStatusValue = "ADD CARD";
        } else {
          this.CardStatusValue = "UPDATE CARD";
        }
        if(res.promotion) {
          this.promotionValue = "Thank you for Signing Up For Promotions";
          this.promotionOptedIn = true;
        } else {
          this.promotionValue = "Sign Up For Promotions";
          this.promotionOptedIn = false;
        }

      });    
  }

  openDialog() {
    const popup = this.dialogRef.open(EditprofileSuccessComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1200ms',
      height: '250px',
      width: '400px',
    });
    popup.afterClosed().subscribe(item =>{
      this.router.navigateByUrl('/userHomePage');
    });
  }

  showAddAddress() {
    this.showAddressDetails = !this.showAddressDetails;
    // this.addressForm.reset();
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
      email: this.email,
      firstname : this.updateForm.value.firstName,
      lastname : this.updateForm.value.lastName,
      phone : this.updateForm.value.phone,
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
    if(this.updateForm.valid){
      if((this.showAddressDetails && this.addressForm.valid) || (this.showAddressDetails == false) ) {
        if((this.cardDetails && this.cardForm.valid) || (this.cardDetails == false)) {
          console.log(user," User");
          //API for registration 
          user = JSON.stringify(user);
          console.log(user," user");
          this._bmsAs.editProfile(user).subscribe((res) => {
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
  }

  showCardDetails() {
    this.cardDetails = !this.cardDetails;
    // this.cardForm.reset();
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
