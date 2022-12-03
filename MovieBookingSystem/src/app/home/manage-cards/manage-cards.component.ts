import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.scss']
})
export class ManageCardsComponent implements OnInit {
  cardForm: FormGroup;
  cardDetails: any;
  cardValueChanges: any;
  constructor(private router: Router, private fb: FormBuilder, private bms: bmsApiService) { }

  get cards() {
    return this.cardForm.get('cardsArray') as FormArray;
  }

  ngOnInit(): void {
    let user = (localStorage.getItem("loggedIn"));
    if (!(user == "true")) {
      this.router.navigateByUrl('/home');
    }
    this.cardForm = this.fb.group({
      cardsArray: this.fb.array([this.createCardForm()])
    });
    // this.cardDetails = this.cardForm.get('cardsArray') as FormArray;
    this.cardValueChanges = this.cardForm.controls["cardsArray"].valueChanges;

  }

  createCardForm(): FormGroup {
    return this.fb.group({
      cardNumber: [null, Validators.compose([Validators.required])],
      expiryMonth: [null, Validators.compose([Validators.required])],
      expiryYear: [null, Validators.compose([Validators.required])],
      nameOnCard: [null, Validators.compose([Validators.required])]
    });
  }

  addCard() {
    const cardsList = <FormArray>this.cardForm.controls['cardsArray'];

    if (cardsList.length < 3) {
      cardsList.push(this.createCardForm());
      console.log(cardsList.length, " length");
    } else {
      // error popup says card limit exceeded.

    }
    // this.cardDetails.push(this.createCardForm());
  }

  removeCard(index: any) {
    const cardList = <FormArray>this.cardForm.controls['cardsArray'];
    cardList.removeAt(index);
  }

  createObj(length:any) {
    let obj :any = {};
    console.log("lenght is",length);
    if(length == 1) {
      let cardsArray : any;
      obj =  [
          {
            cardnumber : this.cardForm.value.cardsArray[0].cardNumber,
            nameoncard : this.cardForm.value.cardsArray[0].nameOnCard,
            expirymonth : this.cardForm.value.cardsArray[0].expiryMonth,
            expiryyear : this.cardForm.value.cardsArray[0].expiryYear,
            old_data : this.cardForm.value.cardsArray[0].cardNumber,
          }
        ] 
      ;
  
    }else if(length == 2) {
      obj = { 
        cardsArray: [
          {
            cardnumber : this.cardForm.value.cardsArray[0].cardNumber,
            nameoncard : this.cardForm.value.cardsArray[0].nameOnCard,
            expirymonth : this.cardForm.value.cardsArray[0].expiryMonth,
            expiryyear : this.cardForm.value.cardsArray[0].expiryYear,
            old_data : this.cardForm.value.cardsArray[0].cardNumber,
          },
          {
            cardnumber : this.cardForm.value.cardsArray[1].cardNumber,
            nameoncard : this.cardForm.value.cardsArray[1].nameOnCard,
            expirymonth : this.cardForm.value.cardsArray[1].expiryMonth,
            expiryyear : this.cardForm.value.cardsArray[1].expiryYear,
            old_data : this.cardForm.value.cardsArray[1].cardNumber,
          }
        ] 
      };
  
    } else if( length == 3) {
      obj = { 
        cardsArray: [
          {
            cardnumber : this.cardForm.value.cardsArray[0].cardNumber,
            nameoncard : this.cardForm.value.cardsArray[0].nameOnCard,
            expirymonth : this.cardForm.value.cardsArray[0].expiryMonth,
            expiryyear : this.cardForm.value.cardsArray[0].expiryYear,
            old_data : this.cardForm.value.cardsArray[0].cardNumber,
          },
          {
            cardnumber : this.cardForm.value.cardsArray[1].cardNumber,
            nameoncard : this.cardForm.value.cardsArray[1].nameOnCard,
            expirymonth : this.cardForm.value.cardsArray[1].expiryMonth,
            expiryyear : this.cardForm.value.cardsArray[1].expiryYear,
            old_data : this.cardForm.value.cardsArray[1].cardNumber,
          },
          {
            cardnumber : this.cardForm.value.cardsArray[2].cardNumber,
            nameoncard : this.cardForm.value.cardsArray[2].nameOnCard,
            expirymonth : this.cardForm.value.cardsArray[2].expiryMonth,
            expiryyear : this.cardForm.value.cardsArray[2].expiryYear,
            old_data : this.cardForm.value.cardsArray[2].cardNumber,
          }
        ] 
      };
  
    }
    return obj;
  }

  submit() {
    let obj = this.createObj(this.cardForm.value.cardsArray.length);
    obj = JSON.stringify(obj);
    console.log("data sent is",obj);
    
    this.bms.update3Cards(obj).subscribe(res=>{
      if(res) {
        console.log(res," res for update3Cards");
      } else {
        console.log("error for update3Cards method api call");
      }
    })
  }

}
