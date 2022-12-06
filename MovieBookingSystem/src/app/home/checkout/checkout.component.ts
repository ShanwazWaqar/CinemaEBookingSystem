import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cardForm:FormGroup;
  intialPage:boolean = true;
  secondPage:boolean = false;
  thirdPage:boolean = false;
  fourthPage:boolean = false;
  showCardForm:boolean = false;
  showExistingCards:boolean = false;
  email:any;
  movie:any;
  cards:any = [];
  sealectedCard:any;
  noOfCards:any;
  constructor(private fb: FormBuilder,private router: Router,private bms:bmsApiService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.email = (localStorage.getItem("user"));
    this.movie = (localStorage.getItem("movie"));
    this.movie = JSON.parse(this.movie);
    let obj: any;
    obj = {
      email: localStorage.getItem("user")
    };
    obj = JSON.stringify(obj);
    this.bms.retriveCards(obj).subscribe(res => {
      if (res) {
        this.noOfCards = res.length;
        console.log(res," res for cards " ,res.length);
        for(let i=0;i<res.length;i++) {
          this.cards.push("XXXX - XXXX - "+(res[i].cardnumber).substring(res[i].cardnumber.length - 4));
        }
      }
    });
    this.checkoutForm = this.fb.group({
      // firstName : ['',[Validators.required]],
      // lastName : ['',[Validators.required]],
      // email : ['',[Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      // phone : ['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      address1 : ['',[Validators.required]],
      address2 : [''],
      city : ['',[Validators.required]],
      state : ['',[Validators.required]],
      country : ['',[Validators.required]],
      pincode : ['',[Validators.required, Validators.pattern("^[0-9]{5}$")]],
      cardSelected : [''],
      cvv : ['',[]],
    });
    this.cardForm = this.fb.group({
      cardNo : ['',[Validators.required,Validators.pattern("[0-9]{12}")]],
      month : ['',[Validators.required]],
      year : ['',[Validators.required,Validators.pattern('^[0-9]{4}$')]],
      cvv : ['',[Validators.required]],
      name : ['',[Validators.required]],
    });
  }

  initalPage() {
    this.intialPage = true;
    this.secondPage = false;
    this.thirdPage = false;
    this.fourthPage = false;
  }

  secondPageOfRegistration() {
    this.intialPage = false;
    this.secondPage = true;
    this.thirdPage = false;
    this.fourthPage = false;
  }

  thirdPageOfRegistration() {
    this.intialPage = false;
    this.secondPage = false;
    this.thirdPage = true;
    this.fourthPage = false;
  }

  thirdPageOfRegistration2() {
    this.showCardForm = true;
  }
  ShowExistingCards() {
    this.showExistingCards = true;
  }

  fourthPageOfRegistration() {
    this.intialPage = false;
    this.secondPage = false;
    this.thirdPage = false;
    this.fourthPage = true;
  }

  cancelCheckout() {
    this.router.navigateByUrl('/home');
  }

  skipCard() {
    this.showCardForm = false;
  }

  addCard() {
    let paydata:any;
        paydata={
          email : this.email,
          cardnumber : (this.cardForm.value.cardNo),
          expirymonth : (this.cardForm.value.month),
          expiryyear : (this.cardForm.value.year),
          nameoncard: (this.cardForm.value.name),
          old_data:(this.cardForm.value.cardNo)
        }
        paydata=JSON.stringify(paydata);
        this.bms.addCards(paydata).subscribe(res=>{
          if(res){
            //payment card added successfully!!.
          }
        });
  }

  placeOrder() {
    if(this.checkoutForm.valid) {
      // valid form
      if(this.checkoutForm.value.cardSelected || this.showCardForm) {
        console.log("paymeny method is selected");
        if(this.showCardForm) {
          if(this.cardForm.valid) {
            localStorage.setItem("movie",JSON.stringify(this.movie));
            this.router.navigateByUrl('/confirmation');
          } else {
            this.cardForm.markAllAsTouched();
          }
        } else {
          if(this.checkoutForm.value.cvv != "") {
            localStorage.setItem("movie",JSON.stringify(this.movie));
            this.router.navigateByUrl('/confirmation');
          }
        }
      } else {
        // no payment card selected.
        console.log("no payment card selected ");
      }
    } else {
      console.log("invalid form");
    }


    let obj:any;
    obj = {
      firstname : this.checkoutForm.value.firstName,
      lastname : this.checkoutForm.value.lastName,
      email : this.checkoutForm.value.email,
      phone : this.checkoutForm.value.phone,
      address1 : this.checkoutForm.value.address1,
      address2 : this.checkoutForm.value.address2,
      city : this.checkoutForm.value.city,
      state : this.checkoutForm.value.state,
      country : this.checkoutForm.value.country,
      zipcode : this.checkoutForm.value.pincode,
    }
    if(this.checkoutForm.value.cardSelected == "" ) {
      if(this.showCardForm) {
        
      }
      this.movie.cardNo = this.cardForm.value.cardNo;
    } else {
      //selecting from existing cards
      this.movie.cardNo = this.checkoutForm.value.cardSelected;
      obj.cardSelected = this.checkoutForm.value.cardSelected;
    }

    
  }

}

function cardMonthCheck(control: AbstractControl): {[key:string]:any} | null { 
  const month:string = control.value;
  if(month == null) {
    return null;
  } else {
    if(month.length == 2) {
      return null;
    } else {
      return { 'monthError' : true }
    }
  }

 }
