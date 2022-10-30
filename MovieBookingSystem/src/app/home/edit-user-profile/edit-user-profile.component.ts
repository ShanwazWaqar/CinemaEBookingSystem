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
  cardForm: FormGroup;
  constructor(private activatedroute:ActivatedRoute, private router: Router, private fb: FormBuilder, private _bmsAs: bmsApiService, private tds: tempDataService) {
      
   }
  ngOnInit(): void {
    if(localStorage.getItem("loggedIn") == "false") {
      this.router.navigateByUrl('/home');
    }
    this.email = this.tds.decryptData(localStorage.getItem("user"));
    this.updateForm = this.fb.group({
      fullName : ['',[Validators.required]],
      email : [{ value: this.email, disabled: true},[Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone : ['',[Validators.required,]],
      password : ['', [Validators.required]],
      password2 : ['',[Validators.required]],
      address1 : ['',[Validators.required]],
      address2 : ['',[Validators.required]],
      city : ['',[Validators.required]],
      state : ['',[Validators.required]],
      country : ['',[Validators.required]],
      pincode : ['',[Validators.required, Validators.pattern("^[a-zA-Z0-9]{5}$")]],
    });
    this.cardForm = this.fb.group({
      cardNo : ['',[Validators.required]],
      month : ['',[Validators.required,Validators.pattern('^[0-9]{2}$')]],
      year : ['',[Validators.required,Validators.pattern('^[0-9]{4}$')]],
      cvv : ['',[Validators.required,Validators.pattern('^[0-9]{3}[0-9]{0,1}$')]],
      name : ['',[Validators.required]],
    });
  }

  updateProfile() {
    this.router.navigateByUrl('/userHomePage');
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
